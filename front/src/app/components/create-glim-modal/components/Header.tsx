import { X } from '../../../ui/icons';
import { StepIndicators } from '../../../ui';
import { Breadcrumps } from './Breadcrumps';

interface HeaderProps {
  step?: number;
  onClose?: () => void;
}

export function Header({ step, onClose }: HeaderProps) {
  return (
    <>
      {/* MOBILE & TABLET */}
      <div className="flex flex-col items-end p-4 md:hidden">
        <button
          onClick={onClose}
          aria-label="Fermer"
          className="h-9 w-9 items-center justify-center rounded-full flex cursor-pointer hover:bg-black/10 hover:text-white transition">
          <X className="h-5 w-5" />
        </button>
        <div className="w-full px-10 sm:px-20">
          <StepIndicators
            currentStep={1}
            numberOfSteps={2}
          />
        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden md:flex md:flex-col">
        <div className="flex justify-end items-center pt-2 px-2 md:px-4 md:pt-4">
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="h-9 w-9 items-center justify-center rounded-full flex cursor-pointer hover:bg-black/10 hover:text-white transition">
            <X className="h-5 w-5" />
          </button>
        </div>

        <Breadcrumps currentStep={step!} />
      </div>
    </>
  );
}
