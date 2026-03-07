'use client';

import Link from 'next/link';
import Divider from './Divider';
import EmailSignUp from './EmailSignUp';
import GoogleSignUp from './GoogleSignUp';
import { AuthLayout } from '@/app/ui';

export default function SignUpSection({ onNext }: { onNext: () => void }) {
  return (
    <AuthLayout>
      <div className="flex flex-col items-center gap-2 pb-6 md:pb-8">
        <div className="text-center text-2xl md:text-3xl font-bold">
          <h1>Partagez vos souvenirs</h1>
          <h1>inmanquables</h1>
        </div>
        <p className="text-gray-500 hidden md:block">
          Inscris-toi pour débloquer toutes les fonctionnalités
        </p>
      </div>

      <div className="flex flex-col md:flex-col-reverse gap-4">
        <EmailSignUp onNext={onNext} />
        <Divider />
        <GoogleSignUp />
      </div>

      <p className="text-center font-medium mt-12">
        Déjà un compte ?{' '}
        <Link
          className="text-orange-400 cursor-pointer hover:text-red-400 hover:underline"
          href="/connexion">
          Connectez-vous
        </Link>
      </p>
    </AuthLayout>
  );
}
