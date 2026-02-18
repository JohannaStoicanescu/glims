'use client';

import MobileContent from './components/MobileContent';
import DesktopContent from './components/DesktopContent';

interface CreateGlimsModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableGlims: number;
}

export default function CreateGlimsModal({
  isOpen,
  onClose,
  availableGlims,
}: CreateGlimsModalProps) {
  return (
    <>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/80 transition-opacity z-40"
            onClick={onClose}
          />
          <MobileContent
            onClose={onClose}
            availableGlims={availableGlims}
          />
          <DesktopContent
            onClose={onClose}
            availableGlims={availableGlims}
          />
        </>
      )}
    </>
  );
}
