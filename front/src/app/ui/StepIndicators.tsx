interface BreadcrumpsProps {
  readonly currentStep: number;
  readonly numberOfSteps: number;
}

export default function StepIndicators({
  currentStep,
  numberOfSteps,
}: BreadcrumpsProps) {
  return (
    <div className="flex items-center gap-2 my-3 w-full">
      {Array.from({ length: numberOfSteps }, (_, index) => (
        <div
          key={index}
          className={`flex-grow border-2 border-t rounded-full ${currentStep > index ? 'border-red-500' : 'border-gray-300'}`}></div>
      ))}
    </div>
  );
}
