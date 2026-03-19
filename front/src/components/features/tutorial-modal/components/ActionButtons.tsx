'use client';

import { ButtonForm } from '@/components';
import { ChevronRight } from '@/components/ui/icons';

interface ActionButtonsProps {
  onNext: () => void;
  onSkip: () => void;
}

export default function ActionButtons({ onNext, onSkip }: ActionButtonsProps) {
  return (
    <div className="w-full space-y-4">
      <ButtonForm
        text={
          <span className="flex items-center gap-2">
            Continuer <ChevronRight className="w-4 h-4" />
          </span>
        }
        onClick={onNext}
        style="dark"
        extraCss="w-full py-4 text-lg"
      />

      <div className="w-full flex justify-center">
        <button
          onClick={onSkip}
          className="text-gray-400 hover:text-gray-600 font-medium text-sm transition-colors cursor-pointer text-center">
          Passer les explications
        </button>
      </div>
    </div>
  );
}
