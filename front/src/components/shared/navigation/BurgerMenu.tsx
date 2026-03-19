'use client';

import Image from 'next/image';
import { useState } from 'react';

import NavLinks from './components/NavLinks';
import { NAV_LINKS } from './utils/get-nav-links';
import { CreateGlimsModal, Modal, Menu } from '@/components';

export default function BurgerMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCreateGlimsModalOpen, setIsCreateGlimsModalOpen] = useState(false);

  const handleCloseMenu = () => setIsMenuOpen(false);

  return (
    <>
      <div className="flex justify-center items-center">
        {/* BURGER MENU BUTTON */}
        <button
          type="button"
          aria-label="Ouvrir le menu de navigation"
          aria-expanded={isMenuOpen}
          className="p-1 mr-1 rounded-lg border border-transparent cursor-pointer active:text-orange-500 active:bg-orange-100 active:border-orange-200 transition focus:outline-none focus:ring-2 focus:ring-orange-200"
          onClick={() => setIsMenuOpen(true)}>
          <Menu size={25} />
        </button>

        <Modal
          isOpen={isMenuOpen}
          onClose={handleCloseMenu}
          position="custom"
          className="h-full w-4/5 sm:w-1/2 max-w-xs animate-in slide-in-from-left duration-300"
          containerClassName="justify-start p-0">
          <nav
            className="p-4 h-full overflow-y-auto flex flex-col"
            aria-label="Navigation mobile">
            {/* GLIMS LOGO */}
            <div className="flex items-center justify-between mt-2 mb-6">
              <Image
                src={'/glims-logo.png'}
                alt="Glims Logo"
                style={{ objectFit: 'contain' }}
                width={90}
                height={90}
              />
              <button
                onClick={handleCloseMenu}
                className="p-2 text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-full"
                aria-label="Fermer le menu">
                ×
              </button>
            </div>

            {/* LIST OF NAV LINKS */}
            <div className="space-y-2">
              {NAV_LINKS.map((link, index) => (
                <NavLinks
                  key={link.title + index}
                  title={link.title}
                  href={link.href}
                  icon={link.icon()}
                  {...(link.title === 'Nouveau' && {
                    onClick: () => {
                      setIsCreateGlimsModalOpen(true);
                      handleCloseMenu();
                    },
                  })}
                />
              ))}
            </div>
          </nav>
        </Modal>
      </div>

      {/* CREATE GLIM MODAL */}
      <CreateGlimsModal
        isOpen={isCreateGlimsModalOpen}
        onClose={() => setIsCreateGlimsModalOpen(false)}
      />
    </>
  );
}
