export default function StepIndicators({
  currentStep,
}: {
  currentStep: number;
}) {
  return (
    <div className="flex items-center gap-2 my-3">
      <div
        className={`flex-grow border-2 border-t rounded-full ${currentStep >= 1 ? 'border-red-500' : 'border-gray-300'}`}></div>
      <div
        className={`flex-grow border-2 border-t rounded-full ${currentStep >= 2 ? 'border-red-500' : 'border-gray-300'}`}></div>
      <div
        className={`flex-grow border-2 border-t rounded-full ${currentStep >= 3 ? 'border-red-500' : 'border-gray-300'}`}></div>
    </div>
  );
}
