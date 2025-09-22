'use client';

import { FormEvent, useContext } from 'react';
import { HiOutlineMail } from 'react-icons/hi';

import { InputForm, ButtonForm } from '@/app/ui';
import { NewUserContext } from '../utils/new-user-context';

export default function EmailSignUp({
  setSignUpStep,
}: {
  setSignUpStep: (step: number) => void;
}) {
  const context = useContext(NewUserContext);

  if (!context) {
    throw new Error();
  }

  const { newUserData, setNewUserData } = context;

  const handleEmailSignUp = (e: FormEvent) => {
    e.preventDefault();

    setNewUserData({
      ...newUserData,
      email: (
        e.currentTarget.querySelector('input[name="email"]') as HTMLInputElement
      ).value,
    });
    setSignUpStep(2);
  };

  return (
    <form
      className="flex flex-col gap-4 w-full"
      onSubmit={handleEmailSignUp}>
      <div className="hidden md:block">
        <InputForm
          label="Email"
          showLabel={false}
          type="email"
          name="email"
          value={newUserData.email || ''}
          placeholder="Votre email"
          required={true}
        />
      </div>

      <ButtonForm
        type="submit"
        text={
          <span className="text-sm md:text-md">Inscription avec email</span>
        }
        icon={<HiOutlineMail />}
        style="dark"
        onClick={() => {}}
      />
    </form>
  );
}
