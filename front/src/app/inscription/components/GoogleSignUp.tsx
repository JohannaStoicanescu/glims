'use client';

import { FaGoogle } from 'react-icons/fa';

import ButtonForm from '@/app/ui/form/ButtonForm';
import { useAuthClient } from '@/hooks';

export default function GoogleSignUp() {
  const authClient = useAuthClient();

  return (
    <div className="flex flex-col gap-4">
      <ButtonForm
        icon={<FaGoogle />}
        text={
          <span className="hidden md:block">S&apos;inscrire avec Google</span>
        }
        style="light"
        onClick={async () => {
          const data = await authClient.signIn.social({
            provider: 'google',
            callbackURL: `${window.location.origin}/exemple-auth?newUser=false`,
            errorCallbackURL: `${window.location.origin}/exemple-auth?error=true`,
            newUserCallbackURL: `${window.location.origin}/exemple-auth?newUser=true`,
          });
          console.table(data);
        }}
      />
    </div>
  );
}
