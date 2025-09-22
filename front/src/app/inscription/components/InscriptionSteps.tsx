'use client';

import { useState } from 'react';

import { NewUserContext } from '../utils/new-user-context';
import CompleteProfileSection from './CompleteProfileSection';
import ImageSection from './ImageSection';
import SignUpSection from './SignUpSection';

export default function InscriptionSteps() {
  const [inscriptionStep, setInscriptionStep] = useState(1);
  const [newUserData, setNewUserData] = useState<any>({
    email: null,
    firstName: null,
    lastName: null,
    password: null,
    profileImage: null,
  });

  return (
    <NewUserContext.Provider value={{ newUserData, setNewUserData }}>
      {inscriptionStep === 1 && (
        <SignUpSection setInscriptionStep={setInscriptionStep} />
      )}
      {inscriptionStep === 2 && (
        <CompleteProfileSection setInscriptionStep={setInscriptionStep} />
      )}
      {inscriptionStep === 3 && (
        <ImageSection setInscriptionStep={setInscriptionStep} />
      )}
    </NewUserContext.Provider>
  );
}
