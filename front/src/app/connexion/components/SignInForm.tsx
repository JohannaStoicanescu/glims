'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { ButtonForm, ControlledInputForm, AuthLayout } from '@/app/ui';
import { ChevronRight, Eye, EyeOff } from '@/app/ui/icons';
import { useAuthClient } from '@/hooks';

interface User {
  email: string;
  password: string;
}

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const authClient = useAuthClient();

  const methods = useForm<User>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onFormSubmit = async (data: User) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data: signInData, error: signInError } =
        await authClient.signIn.email({
          email: data.email,
          password: data.password,
        });

      if (signInError) {
        setError(signInError.message || 'Identifiants incorrects.');
        return;
      }

      if (signInData) {
        window.location.href = '/mes-glims';
      }
    } catch (err) {
      console.error('Sign in error:', err);
      setError('Une erreur inattendue est survenue.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col items-center gap-2 pb-6 md:pb-8">
        <div className="text-center text-2xl md:text-3xl font-bold">
          <h1>Connectez-vous</h1>
        </div>
      </div>

      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl relative shadow-sm">
          {error}
        </div>
      )}

      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className="flex flex-col gap-4">
          <ControlledInputForm
            type="email"
            name="email"
            label="Email"
            showLabel={false}
            placeholder="Votre email"
            required={true}
          />

          <div className="flex flex-col">
            <div className="relative">
              <input
                {...register('password', { required: 'Mot de passe requis' })}
                type={showPassword ? 'text' : 'password'}
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

          <ButtonForm
            type="submit"
            text={isLoading ? 'Connexion...' : 'Connexion'}
            icon={!isLoading && <ChevronRight />}
            iconPosition="right"
            style="dark"
            extraCss="w-full mt-4"
            disabled={isLoading}
          />
        </form>
      </FormProvider>

      <p className="text-center font-medium mt-12">
        Pas encore de compte ?{' '}
        <Link
          className="text-orange-400 cursor-pointer hover:text-red-400 hover:underline"
          href="/inscription">
          Inscrivez-vous
        </Link>
      </p>
    </AuthLayout>
  );
}
