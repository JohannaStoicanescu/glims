'use client';

import { useState } from 'react';

import { NewUser, NewUserContext } from '../utils/new-user-context';
import CompleteProfileSection from './CompleteProfileSection';
import ImageSection from './ImageSection';
import SignUpSection from './SignUpSection';

export default function SignUpSteps() {
  const [signUpStep, setSignUpStep] = useState(1);
  const [newUserData, setNewUserData] = useState<NewUser>({
    email: null,
    firstName: null,
    lastName: null,
    password: null,
    profileImage: null,
  });

  return (
    <NewUserContext.Provider value={{ newUserData, setNewUserData }}>
      {signUpStep === 1 && <SignUpSection setSignUpStep={setSignUpStep} />}
      {signUpStep === 2 && (
        <CompleteProfileSection setSignUpStep={setSignUpStep} />
      )}
      {signUpStep === 3 && <ImageSection setSignUpStep={setSignUpStep} />}
    </NewUserContext.Provider>
  );
}
