import Image from 'next/image';

import { BurgerMenu } from '..';
import AvatarRounded from './components/avatar-rounded/AvatarRounded';
import NotificationsBell from './components/NotificationsBell';

export default function Header({ children }: { children?: React.ReactNode }) {
  return (
    <header
      className={`flex justify-between md:justify-end py-6 pr-4 ${children ? 'md:pr-8' : 'pl-3 md:px-8'}`}>
      <div className="flex items-center md:hidden">
        <BurgerMenu />
        <Image
          src="/glims-logo-filed-with-text.svg"
          alt={'Logo textuel de Glims'}
          width={100}
          height={100}
        />
      </div>
      <div
        className={`${children ? 'flex flex-1 items-center justify-between' : ''}`}>
        <div className="max-md:hidden">{children}</div>
        <div className="flex items-center gap-4">
          <NotificationsBell />
          <AvatarRounded />
        </div>
      </div>
    </header>
  );
}
