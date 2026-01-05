import { X } from '../../../ui/icons';

interface CloseModalButtonProps {
  readonly onClose: () => void;
  readonly setStep: (step: number) => void;
}

export function CloseModalButton({ onClose, setStep }: CloseModalButtonProps) {
  return (
    <div className="flex justify-end items-center pt-6 px-2 md:px-4 md:pt-4">
      <button
        onClick={() => {
          setStep(1);
          onClose();
        }}
        aria-label="Fermer la fenêtre de création de Glims"
        className="h-9 w-9 items-center justify-center rounded-xl flex border border-white
        hover:text-orange-600 hover:bg-red-50 hover:border-red-100 focus:text-orange-600 focus:bg-red-50 focus:border-red-100 cursor-pointer transition">
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}
