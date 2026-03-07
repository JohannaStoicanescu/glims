'use client';

interface PaginationDotsProps {
  currentStep: number;
  totalSteps: number;
}

export default function PaginationDots({
  currentStep,
  totalSteps,
}: PaginationDotsProps) {
  return (
    <div className="flex gap-2">
      {Array.from({ length: totalSteps }).map((_, idx) => (
        <div
          key={idx}
          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
            idx === currentStep ? 'bg-orange-500 w-4' : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  );
}
