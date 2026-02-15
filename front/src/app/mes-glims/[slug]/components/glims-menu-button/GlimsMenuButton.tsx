'use client';

import { useState } from 'react';

import { EllipsisVertical } from '@/app/ui/icons';
import GlimsOptionsMenu from './components/GlimsOptionsMenu';

interface Picture {
  id: string;
  author: string;
  download_url: string;
}

interface GlimsMenuButtonProps {
  pictures: Picture[];
  glimsName: string;
}

export default function GlimsMenuButton({
  pictures,
  glimsName,
}: GlimsMenuButtonProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="p-2 rounded-lg hover:bg-gray-200 cursor-pointer transition"
        onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <EllipsisVertical />
      </button>

      <GlimsOptionsMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        pictures={pictures}
        glimsName={glimsName}
      />
    </div>
  );
}
