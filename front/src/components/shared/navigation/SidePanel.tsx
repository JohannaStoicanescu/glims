'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { PanelLeftClose, CreateGlimsModal } from '@/components';
import NavLinks from './components/NavLinks';
import { NAV_LINKS } from './utils/get-nav-links';

const SIDEBAR_STORAGE_KEY = 'glims-sidebar-reduced';

export default function SidePanel() {
  const [isMenuReduced, setIsMenuReduced] = useState(false);
  const [isCreateGlimsModalOpen, setIsCreateGlimsModalOpen] = useState(false);

  // Load state from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY);
    if (stored !== null) {
      setIsMenuReduced(stored === 'true');
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuReduced((prev) => {
      const next = !prev;
      localStorage.setItem(SIDEBAR_STORAGE_KEY, String(next));
      return next;
    });
  };

  return (
    <>
      <nav
        className={`hidden md:flex h-screen border-r border-gray-200 transition-all duration-300 ease-in-out ${
          isMenuReduced ? 'w-20' : 'w-64'
        }`}>
        <div className="flex flex-col h-full w-full p-2 pt-8 lg:p-4 lg:pt-8 overflow-hidden">
          {/* GLIMS LOGO */}
          <div className="flex items-center h-12 px-2">
            <div className="relative w-full h-full">
              <Image
                src="/glims-logo-filed-with-text.svg"
                alt="Logo textuel de Glims"
                className={`absolute inset-0 transition-opacity duration-300 ${
                  isMenuReduced
                    ? 'opacity-0 pointer-events-none'
                    : 'opacity-100'
                }`}
                width={100}
                height={40}
                style={{
                  objectFit: 'contain',
                  objectPosition: 'left',
                  height: 'auto',
                }}
              />
              <Image
                src="/glims-logo-filed.svg"
                alt="Logo Glims"
                className={`absolute inset-0 transition-opacity duration-300 ${
                  isMenuReduced
                    ? 'opacity-100'
                    : 'opacity-0 pointer-events-none'
                }`}
                width={36}
                height={36}
                style={{ objectFit: 'contain', objectPosition: 'center' }}
              />
            </div>
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
                onClick={toggleMenu}>
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
      />
    </>
  );
}
