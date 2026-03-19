import { ButtonForm } from '../..';
import { X } from '../../icons';

interface ConfirmationModalContentProps {
  readonly icon: React.ReactNode;
  readonly title: string;
  readonly message: string;
  readonly confirmButtonText: string;
  readonly cancelButtonText: string;
  readonly onConfirm: () => void;
  readonly onCancel: () => void;
  readonly radial?: boolean;
}

export function ConfirmationModalContent({
  icon,
  title,
  message,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
  onCancel,
  radial = false,
}: ConfirmationModalContentProps) {
  return (
    <div
      className={`rounded-xl p-6 pt-4 md:p-10 md:pt-8 flex flex-col items-center gap-4 
            ${radial ? 'bg-radial from-red-100 via-white to-white bg-[length:200%_200%] bg-top' : 'bg-white'}`}>
      <div className="w-full flex justify-end">
        <button
          type="button"
          className="cursor-pointer text-gray-400 hover:text-gray-600 p-1 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-full"
          onClick={onCancel}
          aria-label="Fermer la modale">
          <X />
        </button>
      </div>
      <div
        className="text-4xl bg-red-50 text-red-500 rounded-full w-20 h-20 md:w-32 md:h-32 flex items-center justify-center"
        aria-hidden="true">
        {icon}
      </div>
      <h2
        id="confirmation-modal-title"
        className="text-center font-semibold text-2xl">
        {title}
      </h2>
      <p
        id="confirmation-modal-description"
        className="text-center text-gray-600 w-11/12 md:w-2/3">
        {message}
      </p>
      <div className="w-full flex items-center gap-2 mt-2">
        <ButtonForm
          text={cancelButtonText}
          onClick={onCancel}
          style="light"
          extraCss="w-full"
        />
        <ButtonForm
          text={confirmButtonText}
          onClick={onConfirm}
          style="dark"
          extraCss="w-full"
        />
      </div>
    </div>
  );
}
