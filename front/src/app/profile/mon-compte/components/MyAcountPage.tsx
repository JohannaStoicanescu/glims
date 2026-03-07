'use client';

import React, { useState } from 'react';
import { useForm, RegisterOptions } from 'react-hook-form';

import EditableRow from './EditableRow';
import PremiumButton from './PremiumButton';
import ProfilePhotoSection from './ProfilePhotoSection';
import NotificationsSection from './NotificationsSection';
import EmailDisplay from './EmailDisplay';

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

export default function MonComptePage() {
  const {
    register,
    getValues,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues: {
      nom: 'Guillou',
      prenom: 'Barthélémy',
      email: 'barthelemy@gmail.com',
      newsletter: false,
    },
  });

  const [updatingFields, setUpdatingFields] = useState<Record<string, boolean>>(
    {}
  );
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const newsletter = watch('newsletter');
  const currentEmail = watch('email');

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
      // TODO: Appeler l'API réelle pour mettre à jour le profil de l'utilisateur
      console.log(`[UPDATE] Simulating update for ${field}:`, value);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log(`[UPDATE] ${field} updated successfully (simulated)`);
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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setValue('newsletter', nextValue);
      console.log('[NEWSLETTER] toggle (simulated):', nextValue);
    } finally {
      setUpdatingFields((prev) => ({ ...prev, [field]: false }));
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
          onPhotoChange={setPhotoFile}
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
