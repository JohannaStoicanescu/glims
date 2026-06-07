'use client';

import { useState } from 'react';
import Image from 'next/image';
import { User } from 'lucide-react';
import { MenuContent } from './components';
import { Dropdown, Modal } from '@/components';
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

  const hasImage =
    user.avatar && !user.avatar.includes('martin-luther-king.jpg');
  const closeMenu = () => setIsMenuOpen(false);

  const avatarTrigger = (
    <button
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      aria-label="Menu utilisateur"
      aria-expanded={isMenuOpen}
      className={`rounded-full border border-transparent cursor-pointer transition ${
        hasImage
          ? 'w-10 h-10 p-0 overflow-hidden'
          : 'p-2 hover:text-orange-600 hover:bg-red-50 hover:border-red-100 focus:text-orange-600 focus:bg-red-50 focus:border-red-100'
      }`}>
      {hasImage ? (
        <div className="relative w-full h-full">
          <Image
            src={user.avatar}
            alt="Avatar utilisateur"
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <User size={20} />
      )}
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
