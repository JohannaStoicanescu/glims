import Image from 'next/image';

import { AvatarRounded, BurgerMenu } from '..';

export default function Header() {
  return (
    <header className="flex justify-between md:justify-end py-6 pl-3 pr-4 md:px-8">
      <div className="flex items-center md:hidden">
        <BurgerMenu />
        <Image
          src="/glims-logo-filed-with-text.svg"
          alt={'Logo textuel de Glims'}
          width={100}
          height={100}
        />
      </div>
      <div>
        <AvatarRounded />
      </div>
    </header>
  );
}
