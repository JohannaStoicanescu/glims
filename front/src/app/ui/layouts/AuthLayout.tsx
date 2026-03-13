'use client';

import Image from 'next/image';
import { ReactNode } from 'react';
import { ChevronLeft } from '../icons';

interface AuthLayoutProps {
  children: ReactNode;
  onBack?: () => void;
  showBackButton?: boolean;
}

export default function AuthLayout({
  children,
  onBack,
  showBackButton = false,
}: AuthLayoutProps) {
  return (
    <main className="flex flex-col h-screen w-screen md:flex-row">
      {/* LEFT ORANGE PANEL */}
      <div 
        className="bg-orange-400 h-1/3 md:h-screen md:w-1/2 flex justify-center items-start md:items-start pt-16"
        aria-hidden="true">
        <Image
          src="/glims-logo-blanc.png"
          alt=""
          width={120}
          height={120}
          className="md:hidden h-auto"
        />
      </div>

      {/* RIGHT WHITE CONTENT */}
      <div className="flex-1 p-8 bg-white md:w-1/2 md:h-screen flex flex-col relative">
        {/* DESKTOP LOGO */}
        <div className="hidden md:block mb-8" aria-hidden="true">
          <Image
            src="/glims-logo.png"
            alt=""
            width={100}
            height={100}
            className="h-auto"
          />
        </div>

        <div className="flex flex-col items-center justify-start md:justify-center h-full overflow-y-auto">
          <section className="w-full max-w-sm mx-auto" aria-label="Formulaire d'authentification">
            {/* BACK BUTTON */}
            {showBackButton && (
              <button
                type="button"
                onClick={onBack}
                aria-label="Revenir à l'étape précédente"
                className="flex items-center gap-2 mb-6 text-gray-600 cursor-pointer hover:text-orange-400 transition-colors focus:outline-none focus:underline">
                <ChevronLeft size={20} aria-hidden="true" />
                <span>Retour</span>
              </button>
            )}

            {children}
          </section>
        </div>
      </div>
    </main>
  );
}
