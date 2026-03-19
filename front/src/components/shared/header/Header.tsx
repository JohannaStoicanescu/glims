import Image from 'next/image';

import { BurgerMenu } from '..';
import AvatarRounded from './components/avatar-rounded/AvatarRounded';
import NotificationsBell from './components/NotificationsBell';

export default function Header({ children }: { children?: React.ReactNode }) {
  return (
    <header
      className={`flex items-center justify-between py-6 px-4 md:px-8 ${children ? 'md:justify-between' : 'md:justify-end'}`}>
      {/* Left side on Mobile: Burger + Logo */}
      <div className="flex items-center md:hidden">
        <BurgerMenu />
        <Image
          src="/glims-logo-filed-with-text.svg"
          alt={'Logo textuel de Glims'}
          width={100}
          height={40}
          style={{ objectFit: 'contain', height: 'auto' }}
        />
      </div>

      {/* Middle/Left on Desktop: Children */}
      {children && <div className="hidden md:block flex-1">{children}</div>}

      {/* Right side: Notifications + Avatar */}
      <div className="flex items-center gap-4">
        <NotificationsBell />
        <AvatarRounded />
      </div>
    </header>
  );
}
