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
        aria-label="Plus d'options pour ce Glims"
        aria-haspopup="true"
        aria-expanded={isMenuOpen}
        className="p-2 rounded-lg hover:bg-gray-200 cursor-pointer transition focus:outline-none focus:ring-2 focus:ring-orange-200"
        onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <EllipsisVertical aria-hidden="true" />
      </button>

      <GlimsOptionsMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        pictures={pictures}
        glimName={glimsName}
      />
    </div>
  );
}
