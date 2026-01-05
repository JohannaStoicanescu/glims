'use client';

import Image from 'next/image';
import { useContext, useState } from 'react';

import { ChevronLeft, ChevronRight, Eye } from '../../ui/icons';
import { ButtonForm, ControlledInputForm, StepIndicators } from '../../ui';
import { NewUserContext } from '../utils/new-user-context';
import Checkboxes from './Checkboxes';
import SideDisplay from './SideDisplay';

export default function CompleteProfileSection({
  setSignUpStep,
}: {
  setSignUpStep: (step: number) => void;
}) {
  const [showPassword, setShowPassword] = useState(false);

  const context = useContext(NewUserContext);

  if (!context) {
    throw new Error();
  }

  const { newUserData, setNewUserData } = context;

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
    setSignUpStep(3);
  };

  return (
    <main className="flex flex-col h-screen w-screen md:flex-row">
      <SideDisplay />

      <div className="h-screen p-8 bg-white md:w-1/2">
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
              onClick={() => setSignUpStep(1)}
              className="flex items-center gap-2 pt-3 cursor-pointer hover:text-red-400 focus:text-slate-300">
              <ChevronLeft />
              <span>Retour</span>
            </button>
            <h1 className="text-center text-3xl font-bold my-8 md:pt-0">
              Bienvenue sur Glims
            </h1>

            <form
              onSubmit={handleProfileCompletion}
              className="flex flex-col">
              <div className="flex flex-col gap-2 mb-5">
                <div className="flex flex-col md:hidden">
                  <ControlledInputForm
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Votre email"
                  />
                </div>

                <div className="flex flex-col">
                  <ControlledInputForm
                    label="Prénom"
                    type="text"
                    name="firstName"
                    placeholder="Votre prénom"
                  />
                </div>

                <div className="flex flex-col">
                  <ControlledInputForm
                    label="Nom"
                    type="text"
                    name="lastName"
                    placeholder="Votre nom"
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
                    <Eye
                      size={20}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-yellow-400 transition"
                      aria-label="Afficher le mot de passe"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </div>
                </div>

                <Checkboxes />
              </div>

              <StepIndicators
                currentStep={1}
                numberOfSteps={3}
              />

              <ButtonForm
                type="submit"
                icon={<ChevronRight />}
                iconPosition="right"
                text={'Continuer'}
                style="dark"
                onClick={() => {
                  setSignUpStep(3);
                }}
              />
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
