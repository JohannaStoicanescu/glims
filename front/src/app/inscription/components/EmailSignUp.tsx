'use client';

import { useFormContext } from 'react-hook-form';
import { HiOutlineMail } from 'react-icons/hi';

import { ButtonForm, ControlledInputForm } from '@/components';
import { NewUser } from '@/types';

export default function EmailSignUp({ onNext }: { onNext: () => void }) {
  const { trigger } = useFormContext<NewUser>();

  const handleEmailSignUp = async (e: React.MouseEvent) => {
    e.preventDefault();

    // Validate only the email field before proceeding
    const isValid = await trigger('email');
    if (isValid) {
      onNext();
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="block">
        <ControlledInputForm
          type="email"
          name="email"
          label="Email"
          showLabel={false}
          placeholder="Votre email"
          required={true}
        />
      </div>

      <ButtonForm
        type="button"
        text={
          <span className="text-sm md:text-md">Inscription avec email</span>
        }
        icon={<HiOutlineMail />}
        style="dark"
        onClick={handleEmailSignUp}
      />
    </div>
  );
}
