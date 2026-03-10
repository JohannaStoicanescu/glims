'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MenuContent } from './components';
import { Dropdown, Modal } from '@/app/ui';
import { useIsMobile } from '@/hooks/use-media-query';
import { useSession } from '@/hooks';

export default function AvatarRounded() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />;
  }

  if (!session) {
    return null; // Should not happen on protected pages but good for safety
  }

  const user = {
    name: session.user.name || 'Utilisateur',
    email: session.user.email,
    avatar: session.user.image || '/martin-luther-king.jpg',
    plan: 'GRATUIT',
  };

  const closeMenu = () => setIsMenuOpen(false);

  const avatarTrigger = (
    <button
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      aria-label="Menu utilisateur"
      aria-expanded={isMenuOpen}
      className="relative w-10 h-10 rounded-full overflow-hidden cursor-pointer transition hover:ring-2 hover:ring-red-400 focus:outline-none focus:ring-2 focus:ring-red-400">
      <Image
        src={user.avatar}
        alt="Avatar utilisateur"
        fill
        className="object-cover"
      />
    </button>
  );

  if (isMobile) {
    return (
      <>
        {avatarTrigger}
        <Modal
          isOpen={isMenuOpen}
          onClose={closeMenu}
          position="bottom"
          className="rounded-t-xl"
          containerClassName="top-[130px]">
          <div className="flex-1 px-2 py-4 overflow-y-auto">
            <MenuContent
              user={user}
              onClose={closeMenu}
            />
          </div>
        </Modal>
      </>
    );
  }

  return (
    <Dropdown
      isOpen={isMenuOpen}
      onClose={closeMenu}
      width="w-80"
      trigger={avatarTrigger}
      usePortal={true}
      className="fixed top-16 right-4">
      <div className="max-h-[80vh] overflow-y-auto">
        <MenuContent
          user={user}
          onClose={closeMenu}
        />
      </div>
    </Dropdown>
  );
}
