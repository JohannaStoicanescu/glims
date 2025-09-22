'use client';

import Image from 'next/image';
import { useContext, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import ButtonForm from '@/app/ui/form/ButtonForm';
import Checkboxes from './Checkboxes';
import StepIndicators from './StepIndicators';
import { FiEye } from 'react-icons/fi';
import InputForm from '@/app/ui/form/InputForm';
import SideDisplay from './SideDisplay';
import { NewUserContext } from '../utils/new-user-context';

export default function CompleteProfileSection({
  setInscriptionStep,
}: {
  setInscriptionStep: (step: number) => void;
}) {
  const [showPassword, setShowPassword] = useState(false);

  const { newUserData, setNewUserData } = useContext(NewUserContext);

  const handleProfileCompletion = (e: React.FormEvent) => {
    e.preventDefault();

    setNewUserData({
      ...newUserData,
      firstName: (
        e.currentTarget.querySelector(
          'input[name="firstName"]'
        ) as HTMLInputElement
      ).value,
      lastName: (
        e.currentTarget.querySelector(
          'input[name="lastName"]'
        ) as HTMLInputElement
      ).value,
      password: (
        e.currentTarget.querySelector(
          'input[name="password"]'
        ) as HTMLInputElement
      ).value,
    });
    setInscriptionStep(3);
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
              onClick={() => setInscriptionStep(1)}
              className="flex items-center gap-2 md:hidden mt-3 cursor-pointer md:hover:text-slate-300 focus:text-slate-300">
              <IoIosArrowBack />
              <span>Retour</span>
            </button>
            <h1 className="text-center text-3xl font-bold my-8 md:mt-0">
              Bienvenue sur Glims
            </h1>

            <form
              onSubmit={handleProfileCompletion}
              className="flex flex-col">
              <div className="flex flex-col gap-2 mb-5">
                <div className="flex flex-col md:hidden">
                  <InputForm
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Votre email"
                    required
                    value={newUserData.email || ''}
                  />
                </div>

                <div className="flex flex-col">
                  <InputForm
                    label="Prénom"
                    type="text"
                    name="firstName"
                    placeholder="Votre prénom"
                    required
                    value={newUserData.firstName || ''}
                  />
                </div>

                <div className="flex flex-col">
                  <InputForm
                    label="Nom"
                    type="text"
                    name="lastName"
                    placeholder="Votre nom"
                    required
                    value={newUserData.lastName || ''}
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    className="text-black mb-1"
                    id="password"
                    aria-label="Votre mot de passe">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      id="password"
                      placeholder="Votre mot de passe"
                      required
                      value={newUserData.password || ''}
                      onChange={(e) =>
                        setNewUserData({
                          ...newUserData,
                          password: e.target.value,
                        })
                      }
                      className="w-full border-2 border-gray-200 p-3 rounded-xl bg-gray-50 hover:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400 transition"
                    />
                    <FiEye
                      size={20}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-yellow-400 transition"
                      aria-label="Afficher le mot de passe"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </div>
                </div>

                <Checkboxes />
              </div>

              <StepIndicators currentStep={1} />

              <ButtonForm
                type="submit"
                icon={<IoIosArrowForward />}
                iconPosition="right"
                text={'Continuer'}
                style="dark"
                onClick={() => {
                  setInscriptionStep(3);
                }}
              />
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
