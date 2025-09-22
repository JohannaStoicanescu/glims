'use client';

import Image from 'next/image';

interface AvatarRoundedProps {
  src: string;
  alt: string;
  size?: string;
  border?: string;
}

export default function AvatarRounded({
  src,
  alt,
  size = 'w-12 h-12',
  border = 'border-none',
}: AvatarRoundedProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={34}
      height={34}
      onClick={() => {}}
      className={`${size} ${border} rounded-full cursor-pointer transition`}
      style={{ objectFit: 'cover' }}
    />
  );
}
