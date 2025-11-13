'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function AvatarRounded() {
  return (
    <Link href="/profile">
      <Image
        src="/martin-luther-king.jpg"
        alt="Avatar utilisateur"
        width={34}
        height={34}
        onClick={() => {}}
        className={`w-10 h-10 rounded-full cursor-pointer transition`}
        style={{ objectFit: 'cover' }}
      />
    </Link>
  );
}
