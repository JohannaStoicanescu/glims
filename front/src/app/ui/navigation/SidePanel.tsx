'use client';

import Image from 'next/image';
import { useState } from 'react';

import { PanelLeftClose } from '../icons';
import { CreateGlimsModal } from '..';
import NavLinks from './components/NavLinks';
import { NAV_LINKS } from './utils/get-nav-links';

export default function SidePanel() {
  // TODO: this state should be in cache or context to persist between pages
  const [isMenuReduced, setIsMenuReduced] = useState(false);
  const [isCreateGlimsModalOpen, setIsCreateGlimsModalOpen] = useState(false);

  return (
    <>
      <nav
        className={`hidden md:flex ${isMenuReduced ? 'animate-[slideInRightNav_0.4s_ease-out_backwards]' : 'min-w-1/6 animate-[slideInRightNav_0.4s_ease-out_forwards]'}`}>
        <div
          className={`flex flex-col h-screen ${isMenuReduced ? 'w-18' : 'w-full'} 
        border-r border-gray-200 p-2 pt-8 lg:p-4 lg:pt-8`}>
          {/* GLIMS LOGO */}
          <div
            className={
              isMenuReduced ? 'flex justify-center' : 'overflow-hidden'
            }>
            <Image
              src={`${isMenuReduced ? '/glims-logo-filed.svg' : '/glims-logo-filed-with-text.svg'}`}
              alt={'Logo textuel de Glims'}
              className={`pl-1 lg:p-0 ${
                !isMenuReduced
                  ? 'animate-[slideInRight_0.5s_ease-out_forwards]'
                  : 'animate-[iconsMenuFadeIn_0.5s_ease-out_forwards]'
              }`}
              width={isMenuReduced ? 29 : 100}
              height={isMenuReduced ? 29 : 100}
            />
          </div>

          {/* LIST OF NAV LINKS */}
          <div className="flex flex-col justify-between flex-1 mt-12">
            <div className="flex flex-col items-start space-y-2">
              {NAV_LINKS.map((link, index) => (
                <NavLinks
                  key={link.title + index}
                  title={link.title}
                  href={link.href}
                  icon={link.icon()}
                  reduced={isMenuReduced}
                  {...(link.title === 'Nouveau' && {
                    onClick: () => {
                      setIsCreateGlimsModalOpen(!isCreateGlimsModalOpen);
                    },
                  })}
                />
              ))}
            </div>

            {/* REDUCE MENU TO THE LEFT TOGGLE BUTTON */}
            <div className="pb-4 flex justify-end">
              <button
                className={`text-gray-600 font-medium ${isMenuReduced ? 'w-full flex justify-center rotate-180 transition-all duration-300' : 'transition-all duration-300'}
                            p-2 rounded-lg border border-transparent
                          hover:text-orange-600 hover:bg-red-50 hover:border-red-100 cursor-pointer transition`}
                onClick={() => setIsMenuReduced(!isMenuReduced)}>
                <PanelLeftClose
                  size={25}
                  className="cursor-pointer transition-colors"
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* CREATE GLIMS MODAL */}
      <CreateGlimsModal
        isOpen={isCreateGlimsModalOpen}
        onClose={() => setIsCreateGlimsModalOpen(false)}
        availableGlims={3} // TODO: Replace with actual available Glims count
      />
    </>
  );
}
