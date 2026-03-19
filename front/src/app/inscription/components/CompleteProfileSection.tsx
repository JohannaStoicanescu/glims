'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { ChevronRight, Eye, EyeOff } from '@/components/ui/icons';
import { ButtonForm, ControlledInputForm, StepIndicators } from '@/components';
import Checkboxes from './Checkboxes';
import { AuthLayout } from '@/components';
import { NewUser } from '@/types';

export default function CompleteProfileSection({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const {
    trigger,
    register,
    formState: { errors },
  } = useFormContext<NewUser>();

  const handleContinue = async (e: React.MouseEvent) => {
    e.preventDefault();

    // Validate profile fields before proceeding
    const isValid = await trigger(['firstName', 'lastName', 'password']);
    if (isValid) {
      onNext();
    }
  };

  return (
    <AuthLayout
      showBackButton
      onBack={onBack}>
      <h1 className="text-center text-3xl font-bold mb-8">
        Bienvenue sur Glims
      </h1>

      <div className="flex flex-col gap-4">
        <ControlledInputForm
          label="Prénom"
          type="text"
          name="firstName"
          placeholder="Votre prénom"
          required={true}
        />

        <ControlledInputForm
          label="Nom"
          type="text"
          name="lastName"
          placeholder="Votre nom"
          required={true}
        />

        <div className="flex flex-col">
          <label
            htmlFor="password-input"
            className="text-black mb-1 font-medium">
            Mot de passe
          </label>
          <div className="relative">
            <input
              {...register('password', { required: 'Mot de passe requis' })}
              type={showPassword ? 'text' : 'password'}
              id="password-input"
              placeholder="Votre mot de passe"
              className={`w-full border-2 p-3 rounded-xl bg-gray-50 transition focus:outline-none focus:ring-1 
                ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 hover:border-yellow-400 focus:ring-yellow-400'}`}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-yellow-400 transition-colors p-1"
              aria-label={
                showPassword
                  ? 'Cacher le mot de passe'
                  : 'Afficher le mot de passe'
              }
              onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <span className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </span>
          )}
        </div>

        <Checkboxes />

        <div className="mt-4 space-y-6">
          <StepIndicators
            currentStep={2}
            numberOfSteps={3}
          />

          <ButtonForm
            type="button"
            icon={<ChevronRight />}
            iconPosition="right"
            text="Continuer"
            style="dark"
            extraCss="w-full"
            onClick={handleContinue}
          />
        </div>
      </div>
    </AuthLayout>
  );
}
