interface BreadcrumpsProps {
  currentStep: number;
}

export function Breadcrumps({ currentStep }: BreadcrumpsProps) {
  return (
    <div className="md:px-6 sm:mx-12">
      <div className="flex justify-start">
        {/* STEP 1 */}
        <div
          className={`flex md:flex-col justify-center items-center ${currentStep === 2 ? 'hidden md:flex' : ''}`}>
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold mr-2 md:mr-0 
              ${
                currentStep === 1
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-500'
              }`}>
            1
          </div>
          <div
            className={`md:mt-2 text-sm ${
              currentStep === 1 ? 'text-gray-900 font-medium' : 'text-gray-500'
            }`}>
            Informations
          </div>
        </div>

        {/* LINE */}
        <div className="hidden md:flex mx-3 mb-6 flex-1 items-center justify-center">
          <div
            className={`w-full h-0.5 bg-black transition-all ${
              currentStep === 2 ? 'w-full' : 'w-0'
            }`}
            aria-hidden
          />
        </div>

        {/* STEP 2 */}
        <div
          className={`flex md:flex-col justify-center items-center ${currentStep === 1 ? 'hidden md:flex' : ''}`}>
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold mr-2 sm:mr-0
              ${
                currentStep === 2
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-500'
              }`}>
            2
          </div>
          <div
            className={`mt-2 text-sm
              ${currentStep === 2 ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
            Invitations
          </div>
        </div>
      </div>
    </div>
  );
}
