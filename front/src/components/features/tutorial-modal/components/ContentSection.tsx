'use client';

import PaginationDots from './PaginationDots';
import ActionButtons from './ActionButtons';

interface ContentSectionProps {
  isMobile: boolean;
  stepData: {
    title: string;
    description: string;
  };
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onClose: () => void;
}

export default function ContentSection({
  isMobile,
  stepData,
  currentStep,
  totalSteps,
  onNext,
  onClose,
}: ContentSectionProps) {
  return (
    <div
      className={`
      flex flex-col p-8 md:p-16 text-center md:text-left bg-white
      ${isMobile ? 'flex-1 rounded-t-3xl -mt-6 z-10 relative' : 'order-1 w-[45%] h-full'}
    `}>
      <div className="flex-1 flex flex-col max-w-md mx-auto md:mx-0 w-full">
        <div className="flex-1 flex flex-col justify-center space-y-4 py-4">
          <h2
            id="tutorial-title"
            className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight animate-in fade-in slide-in-from-bottom-2 duration-300"
            key={`title-${currentStep}`}>
            {stepData.title}
          </h2>

          <p
            id="tutorial-desc"
            className="text-gray-500 text-base md:text-lg animate-in fade-in slide-in-from-bottom-3 duration-500"
            key={`desc-${currentStep}`}>
            {stepData.description}
          </p>
        </div>

        {/* Fixed height action container to prevent vertical shifts */}
        <div className="flex flex-col items-center md:items-start justify-end gap-8 h-[180px] mt-auto">
          <div className="w-full flex justify-center">
            <PaginationDots
              currentStep={currentStep}
              totalSteps={totalSteps}
            />
          </div>

          <ActionButtons
            onNext={onNext}
            onSkip={onClose}
          />
        </div>
      </div>
    </div>
  );
}
