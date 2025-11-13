'use client';

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Image from 'next/image';

import { ButtonForm } from '@/app/ui';
import ImagePicker from './ImagePicker';
import SideDisplay from './SideDisplay';
import { NewUser, NewUserContext } from '../utils/new-user-context';
import { useContext } from 'react';

interface Props {
  setSignUpStep: (step: number) => void;
  formSubmit: (newUserData: NewUser) => void;
}

export default function ImageForm({
  setSignUpStep,
  formSubmit,
}: Readonly<Props>) {
  const context = useContext(NewUserContext);

  if (!context) {
    throw new Error();
  }

  const { newUserData } = context;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    formSubmit(newUserData);

    setSignUpStep(1);
  };
  return (
    <main className="flex flex-col h-screen w-screen md:flex-row">
      <SideDisplay />

      <div className="h-full m-8 bg-white md:w-1/2">
        <div className="hidden md:block">
          <Image
            src={'/glims-logo.png'}
            alt={'Logo textuel de Glims'}
            className="hidden md:block"
            width={100}
            height={100}
          />
        </div>

        <div className="flex items-start md:items-center justify-center h-full">
          <section className="w-96">
            <button
              onClick={() => setSignUpStep(2)}
              className="flex items-center gap-2 md:hidden mt-3 cursor-pointer md:hover:text-slate-300 focus:text-slate-300">
              <IoIosArrowBack />
              <span>Retour</span>
            </button>
            <form
              onSubmit={handleFormSubmit}
              className="flex flex-col">
              <ImagePicker />

              <ButtonForm
                type="submit"
                icon={<IoIosArrowForward />}
                iconPosition="right"
                text="Continuer"
                style="dark"
              />
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
