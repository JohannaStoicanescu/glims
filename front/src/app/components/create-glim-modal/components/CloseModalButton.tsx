import { X } from '../../../ui/icons';

export function CloseModalButton({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex justify-end items-center pt-2 px-2 md:px-4 md:pt-4">
      <button
        onClick={onClose}
        aria-label="Fermer"
        className="h-9 w-9 items-center justify-center rounded-full flex cursor-pointer hover:bg-black/10 hover:text-white transition">
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}
