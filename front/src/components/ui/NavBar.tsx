import { RxHamburgerMenu } from 'react-icons/rx';
import Image from 'next/image';

import AvatarRounded from './AvatarRounded';

export default function NavBar() {
  return (
    <nav className="mt-10 mx-4 flex justify-between">
      <div className="flex items-center">
        <RxHamburgerMenu
          size={22}
          className="ml-1 mr-3"
        />
        <Image
          src={'/glims-logo.png'}
          alt={'glims textuel logo'}
          width={90}
          height={90}
        />
      </div>
      <AvatarRounded
        src={'/martin-luther-king.jpg'}
        alt={''}
      />
    </nav>
  );
}
