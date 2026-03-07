'use client';

import { ChevronLeft, X } from '../../icons';

interface ModalHeaderProps {
  readonly title?: string;
  readonly onBack?: () => void;
  readonly onClose: () => void;
}

export default function ModalHeader({
  title,
  onBack,
  onClose,
}: ModalHeaderProps) {
  return (
    <div className="flex flex-col p-6 pb-2 gap-4">
      {/* Top Row: Navigation and Close */}
      <div className="flex items-center justify-between">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="flex items-center text-sm font-medium text-gray-900 hover:text-gray-600 transition cursor-pointer">
            <ChevronLeft
              size={20}
              className="mr-1"
            />
            Retour
          </button>
        ) : (
          <div />
        )}

        <button
          type="button"
          onClick={onClose}
          className="p-2 -mr-2 text-gray-400 hover:text-gray-600 transition rounded-full hover:bg-gray-100 cursor-pointer"
          aria-label="Fermer">
          <X size={24} />
        </button>
      </div>

      {/* Bottom Row: Title */}
      {title && (
        <h2 className="text-2xl font-bold text-center text-gray-900">
          {title}
        </h2>
      )}
    </div>
  );
}
