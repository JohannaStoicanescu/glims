'use client';

import { FaGoogle } from 'react-icons/fa';

import ButtonForm from '@/app/ui/form/ButtonForm';

export default function GoogleSignUp() {
  return (
    <div className="flex flex-col gap-4">
      <ButtonForm
        icon={<FaGoogle />}
        text={
          <span className="hidden md:block">S&apos;inscrire avec Google</span>
        }
        style="light"
        onClick={() => {}}
      />
    </div>
  );
}
