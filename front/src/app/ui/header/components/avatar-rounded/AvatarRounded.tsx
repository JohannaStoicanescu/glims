'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import { MenuContent } from './components';

export default function AvatarRounded() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const avatarRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // TODO: get user from API
  const user = {
    name: 'Barthélémy',
    email: 'barthelemy@gmail.com',
    avatar: '/martin-luther-king.jpg',
    plan: 'GRATUIT',
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        avatarRef.current &&
        !avatarRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      {/* AVATAR */}
      <button
        ref={avatarRef}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="relative w-10 h-10 rounded-full overflow-hidden cursor-pointer transition hover:ring-2 hover:ring-gray-200">
        <Image
          src={user.avatar}
          alt="Avatar utilisateur"
          fill
          className="object-cover"
        />
      </button>

      {/*
        We use createPortal to render the menu outside the normal React tree (directly into document.body),
        so it can visually overlay the rest of the app and avoid CSS stacking/context issues.
      */}
      {isMenuOpen &&
        createPortal(
          <>
            {/* MOBILE OVERLAY */}
            <div
              className="fixed inset-0 bg-black/50 z-[9998] md:hidden"
              onClick={closeMenu}
            />

            {/* DESKTOP MENU */}
            <div
              ref={menuRef}
              className="hidden md:block fixed bg-white rounded-2xl shadow-xl border border-gray-100 w-80 z-[9999] max-h-[80vh] overflow-y-auto top-16 right-4">
              <MenuContent
                user={user}
                onClose={closeMenu}
              />
            </div>

            {/* MOBILE MENU */}
            <div
              ref={menuRef}
              className="md:hidden fixed inset-x-0 top-[130px] bottom-0 bg-white rounded-t-xl z-[9999] flex flex-col overflow-y-auto">
              <div className="flex-1 px-2">
                <MenuContent
                  user={user}
                  onClose={closeMenu}
                />
              </div>
            </div>
          </>,
          document.body
        )}
    </>
  );
}
