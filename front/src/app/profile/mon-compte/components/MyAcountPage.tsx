'use client';

import React, { useState, useEffect } from 'react';
import { useForm, RegisterOptions } from 'react-hook-form';

import EditableRow from './EditableRow';
import PremiumButton from './PremiumButton';
import ProfilePhotoSection from './ProfilePhotoSection';
import NotificationsSection from './NotificationsSection';
import EmailDisplay from './EmailDisplay';
import { useSession, useUpdateUser } from '@/hooks';

type FormValues = {
  nom: string;
  prenom: string;
  email: string;
  newsletter: boolean;
};

type FieldName = 'nom' | 'prenom' | 'email';

interface EditableField {
  name: FieldName;
  label: string;
  placeholder: string;
  validation: RegisterOptions<FormValues, FieldName>;
}

interface UserFromSession {
  firstName?: string;
  lastName?: string;
  newsletter?: boolean;
  name?: string;
  email?: string;
  image?: string | null;
}

export default function MonComptePage() {
  const { data: session } = useSession();
  const updateUser = useUpdateUser();

  const {
    register,
    getValues,
    setValue,
    watch,
    trigger,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues: {
      nom: '',
      prenom: '',
      email: '',
      newsletter: false,
    },
  });

  // Populate form when session data is loaded
  useEffect(() => {
    if (session?.user) {
      // Split name if firstName/lastName are not available yet in the session object
      // (BetterAuth session might only have 'name')
      const user = session.user as UserFromSession;
      const firstName = user.firstName || user.name?.split(' ')[0] || '';
      const lastName =
        user.lastName || user.name?.split(' ').slice(1).join(' ') || '';

      reset({
        nom: lastName,
        prenom: firstName,
        email: session.user.email || '',
        newsletter: user.newsletter || false,
      });
    }
  }, [session, reset]);

  const [updatingFields, setUpdatingFields] = useState<Record<string, boolean>>(
    {}
  );
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const currentEmail = watch('email');
  const newsletter = watch('newsletter');

  const editableFields: EditableField[] = [
    {
      name: 'nom',
      label: 'Nom',
      placeholder: 'Nom',
      validation: {
        required: 'Nom requis',
        minLength: { value: 2, message: 'Trop court' },
      },
    },
    {
      name: 'prenom',
      label: 'Prénom',
      placeholder: 'Prénom',
      validation: {
        required: 'Prénom requis',
        minLength: { value: 2, message: 'Trop court' },
      },
    },
    {
      name: 'email',
      label: 'Email',
      placeholder: 'Email',
      validation: {
        required: 'Email requis',
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: 'Email invalide',
        },
      },
    },
  ];

  async function updateField(field: FieldName) {
    const isValid = await trigger(field);
    if (!isValid) return;

    setUpdatingFields((prev) => ({ ...prev, [field]: true }));

    try {
      const value = getValues(field);

      const payload: Partial<UserFromSession> = {};
      if (field === 'nom') payload.lastName = value;
      if (field === 'prenom') payload.firstName = value;
      if (field === 'email') payload.email = value;

      // Update full name as well
      if (field === 'nom' || field === 'prenom') {
        const firstName = field === 'prenom' ? value : getValues('prenom');
        const lastName = field === 'nom' ? value : getValues('nom');
        payload.name = `${firstName} ${lastName}`.trim();
      }

      await updateUser.mutateAsync(payload);
    } catch (err) {
      console.error(`[UPDATE] Error updating ${field}:`, err);
    } finally {
      setUpdatingFields((prev) => ({ ...prev, [field]: false }));
    }
  }

  async function toggleNewsletter() {
    const nextValue = !getValues('newsletter');
    const field = 'newsletter';

    setUpdatingFields((prev) => ({ ...prev, [field]: true }));
    try {
      await updateUser.mutateAsync({ newsletter: nextValue });
      setValue('newsletter', nextValue);
    } catch (err) {
      console.error('[NEWSLETTER] Error toggling:', err);
    } finally {
      setUpdatingFields((prev) => ({ ...prev, [field]: false }));
    }
  }

  async function handleSavePhoto() {
    if (!photoFile) return;

    setUpdatingFields((prev) => ({ ...prev, photo: true }));
    try {
      await updateUser.updateProfileImage.mutateAsync(photoFile);
      setPhotoFile(null); // Clear selection after successful upload
    } catch (err) {
      console.error('[PHOTO] Error saving:', err);
    } finally {
      setUpdatingFields((prev) => ({ ...prev, photo: false }));
    }
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 md:px-0">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <h1 className="text-2xl md:text-2xl lg:text-3xl font-bold tracking-tight text-slate-900">
          Votre compte
        </h1>

        <PremiumButton />
      </div>

      <div className="pt-10 bg-white">
        <ProfilePhotoSection
          photoFile={photoFile}
          userImage={session?.user?.image}
          onPhotoChange={setPhotoFile}
          onSave={handleSavePhoto}
          isUpdating={updatingFields['photo']}
        />

        <div className="pt-10 space-y-8">
          {editableFields.map((field) => (
            <EditableRow
              key={field.name}
              label={field.label}
              placeholder={field.placeholder}
              error={errors[field.name]?.message}
              isLoading={updatingFields[field.name]}
              inputProps={register(field.name, field.validation)}
              onUpdate={() => updateField(field.name)}
            />
          ))}

          <EmailDisplay email={currentEmail} />

          <div className="my-10 h-px w-full bg-slate-100" />

          <NotificationsSection
            newsletter={newsletter}
            onToggle={toggleNewsletter}
            isLoading={updatingFields['newsletter']}
          />
        </div>
      </div>
    </div>
  );
}
