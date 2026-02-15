'use client';

import React, { useState } from 'react';
import { useForm, RegisterOptions } from 'react-hook-form';

import EditableRow from './EditableRow';
import PremiumButton from './PremiumButton';
import ProfilePhotoSection from './ProfilePhotoSection';
import NotificationsSection from './NotificationsSection';

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

  const [photoFile, setPhotoFile] = useState<File | null>(null);

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
    const ok = await trigger(field);
    const value = getValues(field);

    if (!ok) {
      console.log(`[UPDATE] échec validation: ${field}`, errors[field]);
      return;
    }
    console.log(`[UPDATE] ${field}:`, value);
  }

  function toggleNewsletter() {
    const next = !getValues('newsletter');
    setValue('newsletter', next, { shouldDirty: true });
    console.log('[NEWSLETTER] toggle:', next);
  }

  return (
    <div className="mx-auto w-full">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
          Votre compte
        </h1>

        <PremiumButton />
      </div>

      <div className="pt-8 bg-white">
        <ProfilePhotoSection
          photoFile={photoFile}
          onPhotoChange={setPhotoFile}
        />

        <div className="pt-10 space-y-6">
          {editableFields.map((field) => (
            <EditableRow
              key={field.name}
              label={field.label}
              placeholder={field.placeholder}
              error={errors[field.name]?.message}
              inputProps={register(field.name, field.validation)}
              onUpdate={() => updateField(field.name)}
            />
          ))}

          <div className="my-8 h-px w-full bg-slate-200" />

          <NotificationsSection
            newsletter={newsletter}
            onToggle={toggleNewsletter}
          />
        </div>
      </div>
    </div>
  );
}
