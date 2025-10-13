'use client';

import { useState } from 'react';

import { NewUser, NewUserContext } from '../utils/new-user-context';
import CompleteProfileSection from './CompleteProfileSection';
import ImageSection from './ImageSection';
import SignUpSection from './SignUpSection';
import { useAuthClient, useSession } from '@/hooks';

export default function SignUpSteps() {
  const [signUpStep, setSignUpStep] = useState(1);
  const [newUserData, setNewUserData] = useState<NewUser>({
    email: null,
    firstName: null,
    lastName: null,
    password: null,
    profileImage: null,
  });

  const formSubmit = async (newUserData: NewUser) => {
    let result = await useAuthClient().signUp.email({
      email: newUserData.email || '',
      password: newUserData.password || '',
      name: `${newUserData.firstName} ${newUserData.lastName}`,
      image: newUserData.profileImage?.name || undefined,
    });
    if (result.data) {
      console.log("after signup");
      console.table(useSession().value);
    }
  };

  return (
    <NewUserContext.Provider value={{ newUserData, setNewUserData }}>
      {signUpStep === 1 && <SignUpSection setSignUpStep={setSignUpStep} />}
      {signUpStep === 2 && (
        <CompleteProfileSection setSignUpStep={setSignUpStep} />
      )}
      {signUpStep === 3 && <ImageSection setSignUpStep={() => { }} formSubmit={formSubmit} />}
    </NewUserContext.Provider>
  );
}
