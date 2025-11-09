'use client';

import Image from 'next/image';
import { useState } from 'react';
import { CgAddR } from 'react-icons/cg';
import { FaRegSun } from 'react-icons/fa';
import { RxHamburgerMenu } from 'react-icons/rx';
import { TbMessageCircle } from 'react-icons/tb';

import { CreateGlimModal } from '../../components';
import { AvatarRounded } from '..';
import NavLinks from './components/NavLinks';
import { PanelLeftClose } from '../icons';

const NAV_LINKS = [
  {
    title: 'Mes Glims',
    href: '/mes-glims',
    icon: <FaRegSun />,
  },
  {
    title: 'Nouveau',
    icon: <CgAddR />,
  },
  {
    title: 'Messages',
    href: '/messages',
    icon: <TbMessageCircle />,
  },
];
export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // TODO: this state should be in cache or context to persist between pages
  const [isMenuReduced, setIsMenuReduced] = useState(false);
  const [isCreateGlimModalOpen, setIsCreateGlimModalOpen] = useState(false);

  return (
    <nav className="fixed flex items-center md:items-start justify-between max-md:py-3 max-md:px-4 w-full z-40 bg-white md:bg-transparent">
      <div className="flex items-center gap-4 md:w-1/6">
        <button
          type="button"
          aria-label="Ouvrir le menu"
          className="p-2 rounded-lg border border-transparent cursor-pointer active:text-orange-500 active:bg-orange-100 active:border-orange-200 transition md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <RxHamburgerMenu size={30} />
        </button>

        {/* MOBILE MENU */}
        {isMenuOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex md:hidden z-50">
            <div className="w-4/5 max-w-xs bg-white p-4 h-full overflow-y-auto shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <Image
                  src={'/glims-logo.png'}
                  alt={'Logo textuel de Glims'}
                  className=""
                  style={{ objectFit: 'contain' }}
                  width={90}
                  height={90}
                />
              </div>
              <div className="space-y-2">
                {NAV_LINKS.map((link, index) => (
                  <NavLinks
                    key={link.title + index}
                    title={link.title}
                    href={link.href}
                    icon={link.icon}
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
            <div
              onClick={() => setIsMenuOpen(false)}
              className="flex-1 bg-black bg-opacity-30 cursor-pointer"
              aria-label="Fermer le menu"></div>
          </div>
        )}

        {/* DESKTOP MENU */}
        <div
          className={`hidden md:flex md:flex-col md:h-screen ${isMenuReduced ? 'md:w-18' : 'md:w-full'} md:border-r md:border-gray-200 md:p-4 md:pt-8`}>
          <div className={isMenuReduced ? 'flex justify-center' : ''}>
            <Image
              src={`${isMenuReduced ? '/glims.png' : '/glims-logo.png'}`}
              alt={'Logo textuel de Glims'}
              width={isMenuReduced ? 25 : 90}
              height={isMenuReduced ? 25 : 90}
            />
          </div>

          <div className="flex flex-col justify-between flex-1 mt-4">
            <div className="flex flex-col items-start space-y-2">
              {NAV_LINKS.map((link, index) => (
                <NavLinks
                  key={link.title + index}
                  title={link.title}
                  href={link.href}
                  icon={link.icon}
                  reduced={isMenuReduced}
                  {...(link.title === 'Nouveau' && {
                    onClick: () =>
                      setIsCreateGlimModalOpen(!isCreateGlimModalOpen),
                  })}
                />
              ))}
            </div>
            <div className="pb-4 flex justify-end">
              <button
                className={`text-gray-600 font-medium ${isMenuReduced ? 'w-full flex justify-center' : ''}
                            p-1 rounded-lg border border-transparent
                          hover:text-orange-500 hover:bg-orange-100 hover:border-orange-200 focus:text-orange-500 focus:bg-orange-100 focus:border-orange-200 cursor-pointer transition`}
                onClick={() => setIsMenuReduced(!isMenuReduced)}>
                <PanelLeftClose
                  size={20}
                  className="cursor-pointer hover:text-orange-500 transition-colors"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AVATAR SECTION */}
      <div className="flex-shrink-0 p-2 md:p-8">
        <AvatarRounded
          src={'/martin-luther-king.jpg'}
          alt={'Avatar utilisateur'}
          border={'border border-white hover:border hover:border-orange-400'}
        />
      </div>

      {/* MODAL */}
      {isCreateGlimModalOpen && (
        <CreateGlimModal
          open={isCreateGlimModalOpen}
          onClose={() => setIsCreateGlimModalOpen(false)}
        />
      )}
    </nav>
  );
}
