import { FieldValues, useFormContext } from 'react-hook-form';

import { ButtonForm, StepIndicators } from '@/app/ui';
import { ChevronLeft, ChevronRight } from '@/app/ui/icons';
import { InvitesSection } from './invites-section/InvitesSection';
import { IconSection } from './icons-section/IconSection';

interface InvitesAndIconsStepProps {
  readonly setStep: (step: number) => void;
}

export default function InvitesAndIconsStep({
  setStep,
}: InvitesAndIconsStepProps) {
  const { handleSubmit } = useFormContext();

  const onSubmit = (data: FieldValues) => {
    // TODO: create hook to submit the form
    console.log('Données du formulaire:', data);
  };

  const handleFinish = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <div>
      <button
        onClick={() => setStep(1)}
        className="hidden md:flex items-center gap-2 font-bold px-5
        hover:text-orange-600 hover:border-red-100 focus:text-orange-600 cursor-pointer transition">
        <ChevronLeft size={20} />
        Retour
      </button>

      <div className="flex flex-col gap-4 md:pt-4">
        <h2
          id="glims-title"
          className="text-2xl md:text-center font-semibold">
          Inviter des membres
        </h2>

        <div>
          <InvitesSection />

          {/* DIVIDER */}
          <div className="h-[1px] bg-gray-200 w-full my-6" />

          <IconSection />
        </div>

        <div>
          <StepIndicators
            currentStep={2}
            numberOfSteps={2}
          />

          <ButtonForm
            style="dark"
            text="Valider la création"
            onClick={handleFinish}
            extraCss="w-full"
            icon={<ChevronRight className="h-5 w-5" />}
            iconPosition="right"
          />
        </div>
      </div>
    </div>
  );
}
