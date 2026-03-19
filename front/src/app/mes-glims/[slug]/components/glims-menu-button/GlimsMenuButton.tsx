'use client';

import { useState } from 'react';

import { EllipsisVertical } from '@/components/ui/icons';
import GlimsOptionsMenu from './components/GlimsOptionsMenu';
import { Picture } from './components/menu-items';

interface GlimsMenuButtonProps {
  pictures: Picture[];
  glimsName: string;
  folderId: string;
}

export default function GlimsMenuButton({
  pictures,
  glimsName,
  folderId,
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
        folderId={folderId}
      />
    </div>
  );
}
