import { ButtonForm } from '../..';
import { X } from '../../icons';

interface ConfirmationModalContentProps {
  icon: React.ReactNode;
  title: string;
  message: string;
  confirmButtonText: string;
  cancelButtonText: string;
  onConfirm: () => void;
  onCancel: () => void;
  radial?: boolean;
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
      <div
        className="w-full flex justify-end cursor-pointer hover:text-orange-300"
        onClick={onCancel}>
        <X />
      </div>
      <span className="text-4xl bg-red-50 text-red-500 rounded-full w-20 h-20 md:w-32 md:h-32 flex items-center justify-center">
        {icon}
      </span>
      <p
        id="confirmation-modal-title"
        className="text-center font-semibold text-2xl">
        {title}
      </p>
      <p className="text-center text-gray-600 w-11/12 md:w-2/3">{message}</p>
      <div className="w-full flex items-center gap-2">
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
