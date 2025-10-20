import { useFormContext } from 'react-hook-form';

import { ChevronLeft, ChevronRight } from '../../../ui/icons';
import { ButtonForm, StepIndicators } from '../../../ui';
import { IconSection } from './components/IconSection';
import { InviteSection } from './components/InviteSection';

interface InvitesAndIconsStepProps {
  readonly setStep: (step: number) => void;
}

export function InvitesAndIconsStep({ setStep }: InvitesAndIconsStepProps) {
  const { handleSubmit } = useFormContext();

  const onSubmit = (data: any) => {
    // TODO: create hook to submit the form
    console.log('Données du formulaire:', data);
  };

  const handleFinish = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <div className="flex flex-col gap-6">
      <h2
        id="glims-title"
        className="text-xl text-center font-semibold md:text-2xl">
        Inviter des membres
      </h2>

      <div>
        <InviteSection />

        {/* DIVIDER */}
        <div className="h-[1px] bg-gray-200 w-full my-6" />

        <IconSection />
      </div>

      <div>
        <StepIndicators
          currentStep={2}
          numberOfSteps={2}
        />

        <div className="flex gap-2">
          <ButtonForm
            style="medium"
            text="Retour"
            onClick={() => {
              setStep(1);
            }}
            extraCss="w-full hidden md:flex"
            icon={<ChevronLeft className="h-5 w-5" />}
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
