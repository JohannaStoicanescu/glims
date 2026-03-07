'use client';

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import CompleteProfileSection from './CompleteProfileSection';
import ImageSection from './ImageSection';
import SignUpSection from './SignUpSection';
import { useAuthClient } from '@/hooks';
import { NewUser } from '@/types';

export default function SignUpSteps() {
  const [signUpStep, setSignUpStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const authClient = useAuthClient();

  const methods = useForm<NewUser>({
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      profileImage: undefined,
    },
  });

  const { handleSubmit } = methods;

  const onFormSubmit = async (data: NewUser) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data: signUpData, error: signUpError } =
        await authClient.signUp.email({
          email: data.email || '',
          password: data.password || '',
          name: `${data.firstName} ${data.lastName}`,
          // We omit image for now as we don't have a URL yet
          // image: data.profileImage ? ... : undefined,
        });

      if (signUpError) {
        setError(
          signUpError.message ||
            'Une erreur est survenue lors de l’inscription.'
        );
        return;
      }

      if (signUpData) {
        // Redirect to a protected page or welcome page
        window.location.href = '/mes-glims';
      }
    } catch (err) {
      console.error('Sign up error:', err);
      setError('Une erreur inattendue est survenue.');
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => setSignUpStep((prev) => prev + 1);
  const prevStep = () => setSignUpStep((prev) => prev - 1);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="h-full">
        {error && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl shadow-lg">
            {error}
          </div>
        )}

        {signUpStep === 1 && <SignUpSection onNext={nextStep} />}
        {signUpStep === 2 && (
          <CompleteProfileSection
            onNext={nextStep}
            onBack={prevStep}
          />
        )}
        {signUpStep === 3 && (
          <ImageSection
            onBack={prevStep}
            isLoading={isLoading}
          />
        )}
      </form>
    </FormProvider>
  );
}
