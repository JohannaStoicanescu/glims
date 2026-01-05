'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FormProvider, useForm } from 'react-hook-form';

import { ButtonForm, ControlledInputForm } from '../../ui';
import { ChevronRight } from '@/app/ui/icons';

interface User {
  email: string;
  password: string;
}

export default function SignInForm() {
  const methods = useForm<User>();

  return (
    <div className="flex flex-col h-screen w-screen md:flex-row">
      <div className="bg-orange-400 h-2/3 md:h-screen md:w-1/2">
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

      <div className="h-1/2 p-8 bg-white md:w-1/2 md:h-screen">
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
            <div className="flex flex-col items-center gap-2 pb-2 md:pb-8">
              <div className="flex flex-col items-center text-xl md:text-3xl font-bold">
                <h1>Connectez vous</h1>
              </div>
            </div>
            <FormProvider {...methods}>
              <div className="flex flex-col">
                <ControlledInputForm
                  type="email"
                  name="email"
                  label="Email"
                  showLabel={false}
                  placeholder="Votre email"
                  validation={{ require }}
                />
                <ControlledInputForm
                  type="password"
                  name="password"
                  label="Mots de passe"
                  showLabel={false}
                  placeholder="Votre mots de passe"
                  validation={{ require }}
                />

                <ButtonForm
                  type="submit"
                  text={<span className="text-sm md:text-md">Connexion</span>}
                  icon={<ChevronRight />}
                  iconPosition="right"
                  style="dark"
                  onClick={() => {}}
                />
              </div>
            </FormProvider>
            <p className="text-center font-medium mt-12">
              Pas encore de compte ?{' '}
              <Link
                className="text-orange-400 cursor-pointer hover:text-red-400 hover:underline"
                href="/connexion">
                Inscrivez-vous
              </Link>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
