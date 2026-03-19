'use client';

import Image from 'next/image';
import { X } from '@/components/ui/icons';

interface VisualSectionProps {
  isMobile: boolean;
  stepData: {
    title: string;
    image: string;
  };
  currentStep: number;
  onClose: () => void;
}

export default function VisualSection({
  isMobile,
  stepData,
  currentStep,
  onClose,
}: VisualSectionProps) {
  return (
    <div
      className={`
      relative flex-1 overflow-hidden
      ${isMobile ? 'h-1/2' : 'order-2 w-[55%] h-full'}
      bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600
    `}>
      <button
        onClick={onClose}
        className={`absolute ${isMobile ? 'top-4 right-4' : 'top-6 right-6 cursor-pointer'} text-white hover:bg-white/20 rounded-full p-2 transition-colors z-20`}
        aria-label="Fermer le tutoriel">
        <X size={isMobile ? 24 : 28} />
      </button>

      <div
        className={`absolute inset-0 flex items-center justify-center ${isMobile ? 'p-8 pt-32' : 'p-12 md:p-20'}`}>
        {isMobile && (
          <div className="absolute top-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 text-white font-bold text-3xl drop-shadow-md">
            <Image
              src="/glims-logo-blanc.png"
              alt="Glims"
              width={50}
              height={50}
              className="w-auto h-10"
            />
          </div>
        )}

        <div
          className={`relative w-full h-full ${isMobile ? 'max-w-[240px] max-h-[240px]' : ''}`}>
          <div
            className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl transform rotate-3 transition-all duration-500 ease-in-out"
            key={currentStep}>
            <Image
              src={stepData.image}
              alt={stepData.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute -z-10 -top-6 -left-6 w-full h-full border-2 border-white/30 rounded-2xl transform -rotate-3"></div>
        </div>
      </div>
    </div>
  );
}
