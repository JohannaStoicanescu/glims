'use client';

import Image from 'next/image';
import Link from 'next/link';

import Divider from './Divider';
import EmailSignUp from './EmailSignUp';
import GoogleSignUp from './GoogleSignUp';

export default function SignUpSection({
  setSignUpStep,
}: {
  setSignUpStep: (step: number) => void;
}) {
  return (
    <main className="flex flex-col h-screen w-screen md:flex-row">
      <div className="bg-orange-400 h-2/3 md:w-1/2 md:h-full">
        <div className="flex justify-center mt-16">
          <Image
            src={'/glims-logo-blanc.png'}
            alt={'Logo textuel de Glims'}
            className="md:hidden"
            width={120}
            height={120}
            style={{ height: 'auto' }}
          />
        </div>
      </div>

      <div className="h-1/2 m-8 bg-white md:w-1/2 md:h-full">
        <Image
          src={'/glims-logo.png'}
          alt={'Logo textuel de Glims'}
          className="hidden md:block"
          width={100}
          height={100}
          style={{ height: 'auto' }}
        />

        <div className="flex items-center justify-center h-full">
          <section className="w-96">
            <div className="flex flex-col items-center gap-2 mb-2 md:mb-8">
              <div className="flex flex-col items-center text-xl md:text-3xl font-bold">
                <h1>Partagez vos souvenirs</h1>
                <h1>inmanquables</h1>
              </div>
              <p className="text-gray-500 hidden md:block">
                Inscris-toi pour débloquer toutes les fonctionnalités
              </p>
            </div>

            <div className="flex flex-col md:flex-col-reverse">
              <EmailSignUp setSignUpStep={setSignUpStep} />

              <Divider />

              <GoogleSignUp />
            </div>

            <p className="text-center font-medium mt-12">
              Déjà un compte ?{' '}
              <Link
                className="text-orange-400 cursor-pointer hover:text-slate-400 hover:underline"
                href="/connexion">
                Connectez-vous
              </Link>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
