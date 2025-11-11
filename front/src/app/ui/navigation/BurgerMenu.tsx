'use client';

import Image from 'next/image';
import { useState } from 'react';

import NavLinks from './components/NavLinks';
import { NAV_LINKS } from './utils/get-nav-links';
import { Menu } from '../icons';
import CreateGlimModal from '../../components/create-glim-modal/CreateGlimModal';

export default function BurgerMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCreateGlimModalOpen, setIsCreateGlimModalOpen] = useState(false);

  return (
    <>
      <nav className="flex justify-center items-center">
        {/* BURGER MENU BUTTON */}
        <button
          type="button"
          aria-label="Ouvrir le menu"
          className="p-1 mr-1 rounded-lg border border-transparent cursor-pointer active:text-orange-500 active:bg-orange-100 active:border-orange-200 transition"
          onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Menu size={25} />
        </button>

        {isMenuOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div className="w-4/5 sm:w-1/2 max-w-xs bg-white p-4 h-full overflow-y-auto shadow-lg">
              {/* GLIMS LOGO */}
              <div className="flex items-center justify-between mt-2 mb-6">
                <Image
                  src={'/glims-logo.png'}
                  alt={'Logo textuel de Glims'}
                  className=""
                  style={{ objectFit: 'contain' }}
                  width={90}
                  height={90}
                />
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
                        setIsCreateGlimModalOpen(!isCreateGlimModalOpen);
                        setIsMenuOpen(false);
                      },
                    })}
                  />
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="flex-1"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
              aria-label="Fermer le menu"
            />
          </div>
        )}
      </nav>

      {/* CREATE GLIM MODAL */}
      <CreateGlimModal
        open={isCreateGlimModalOpen}
        onClose={() => setIsCreateGlimModalOpen(false)}
      />
    </>
  );
}
