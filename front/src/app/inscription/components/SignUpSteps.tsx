'use client';

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { NewUserContext } from '../utils/new-user-context';
import CompleteProfileSection from './CompleteProfileSection';
import ImageSection from './ImageSection';
import SignUpSection from './SignUpSection';
import { useAuthClient } from '@/hooks';
import { NewUser } from '@/types';

export default function SignUpSteps() {
  const [signUpStep, setSignUpStep] = useState(1);
  const [newUserData, setNewUserData] = useState<NewUser>({
    email: null,
    firstName: null,
    lastName: null,
    password: null,
    profileImage: null,
  });
  const authClient = useAuthClient();

  const formSubmit = async (newUserData: NewUser) => {
    const result = await authClient.signUp.email({
      email: newUserData.email || '',
      password: newUserData.password || '',
      name: `${newUserData.firstName} ${newUserData.lastName}`,
      image: newUserData.profileImage?.name || undefined,
    });
    if (result.data) {
      window.location.href = '/exemple-auth?newUser=true';
    }
  };

  const methods = useForm<NewUser>();

  return (
    <NewUserContext.Provider value={{ newUserData, setNewUserData }}>
      <FormProvider {...methods}>
        {signUpStep === 1 && <SignUpSection setSignUpStep={setSignUpStep} />}
        {signUpStep === 2 && (
          <CompleteProfileSection setSignUpStep={setSignUpStep} />
        )}
        {signUpStep === 3 && (
          <ImageSection
            setSignUpStep={() => {}}
            formSubmit={formSubmit}
          />
        )}
      </FormProvider>
    </NewUserContext.Provider>
  );
}
