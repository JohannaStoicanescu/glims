'use client';

import { FormEvent, useContext } from 'react';
import { HiOutlineMail } from 'react-icons/hi';

import { ButtonForm, ControlledInputForm } from '@/app/ui';
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
        <ControlledInputForm
          type="email"
          name="email"
          label="Email"
          showLabel={false}
          placeholder="Votre email"
          validation={{ require }}
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
