import Image from 'next/image';

import { AvatarRounded, BurgerMenu } from '..';

export default function Header() {
  return (
    <header className="flex justify-between md:justify-end my-6 ml-3 mr-4 md:mx-8">
      <div className="flex items-center md:hidden">
        <BurgerMenu />
        <Image
          src="/glims-logo.png"
          alt={'Logo textuel de Glims'}
          width={100}
          height={100}
        />
      </div>
      <AvatarRounded />
    </header>
  );
}
