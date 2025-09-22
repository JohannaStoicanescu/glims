'use client';

import { useState } from 'react';
import { CgAddR } from 'react-icons/cg';
import { FaRegSun } from 'react-icons/fa';
import { RxHamburgerMenu } from 'react-icons/rx';
import { TbMessageCircle } from 'react-icons/tb';
import Image from 'next/image';

import { AvatarRounded } from '..';
import NavLinks from './components/NavLinks';

const NAV_LINKS = [
  {
    title: 'Mes Glims',
    href: '/mes-glims',
    icon: <FaRegSun />,
  },
  {
    title: 'Nouveau',
    href: '/nouveau',
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
  return (
    <nav className="fixed flex items-center md:items-start justify-between max-md:py-3 max-md:px-4 w-full">
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
          <div className="fixed top-0 left-0 w-full h-full flex md:hidden">
            <div className="w-1/2 bg-white p-4">
              <Image
                src={'/glims-logo.png'}
                alt={'Logo textuel de Glims'}
                className="pb-4"
                width={90}
                height={90}
              />
              {NAV_LINKS.map((link) => (
                <NavLinks
                  key={link.href}
                  title={link.title}
                  href={link.href}
                  icon={link.icon}
                />
              ))}
            </div>
            <div
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-1/2 bg-slate-300 opacity-30"></div>
          </div>
        )}

        <div className="md:h-screen md:w-full md:border-r-1 md:border-gray-200 md:p-4 md:pt-8">
          <Image
            src={'/glims-logo.png'}
            alt={'Logo textuel de Glims'}
            className=""
            width={90}
            height={90}
          />

          <div className="max-md:hidden mt-4 flex flex-col items-start">
            {NAV_LINKS.map((link) => (
              <NavLinks
                key={link.href}
                title={link.title}
                href={link.href}
                icon={link.icon}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="md:p-8">
        <AvatarRounded
          src={'/martin-luther-king.jpg'}
          alt={''}
          border={'border border-white hover:border hover:border-orange-400'}
        />
      </div>
    </nav>
  );
}
