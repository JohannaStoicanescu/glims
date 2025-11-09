import { useFormContext } from 'react-hook-form';

import { ChevronLeft, ChevronRight } from '../../../ui/icons';
import { ButtonForm, ControlledInputForm, StepIndicators } from '../../../ui';
import { AccessibilityToTheGlimCheckboxes } from './components/AccessibilityToTheGlimCheckboxes';
import { UsersRoleSelection } from './components/UsersRoleSelection';

interface CompleteProfileStepProps {
  readonly setStep: (step: number) => void;
  readonly onClose: () => void;
}

export function CompleteProfileStep({
  setStep,
  onClose,
}: CompleteProfileStepProps) {
  const { trigger, watch } = useFormContext();

  const handleContinue = async () => {
    const test = watch(['name', 'description', 'accessibility', 'userRole']);

    console.log(test);
    const isStepValid = await trigger([
      'name',
      'description',
      'accessibility',
      'userRole',
    ]);
    if (isStepValid) {
      setStep(2);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <h2
        id="glims-title"
        className="text-xl text-center font-semibold md:text-2xl">
        Créer un Glim
      </h2>
      <ControlledInputForm
        type="text"
        label="Nom du Glim"
        name="name"
        placeholder="Le nom du Glim"
        required
        validation={{
          minLength: {
            value: 2,
            message: 'Le nom doit contenir au moins 2 caractères',
          },
          maxLength: {
            value: 40,
            message: 'Le nom ne peut pas dépasser 40 caractères',
          },
        }}
      />
      <ControlledInputForm
        type="text"
        label="Description (facultatif)"
        name="description"
        placeholder="Ajoutez une description"
        validation={{
          maxLength: {
            value: 200,
            message: 'La description ne peut pas dépasser 200 caractères',
          },
        }}
      />

      <AccessibilityToTheGlimCheckboxes />

      <UsersRoleSelection />

      <div>
        <StepIndicators
          currentStep={1}
          numberOfSteps={2}
        />

        <div className="flex gap-2">
          <ButtonForm
            style="medium"
            text="Annuler"
            onClick={() => onClose()}
            extraCss="w-full hidden md:flex"
            icon={<ChevronLeft className="h-5 w-5" />}
          />
          <ButtonForm
            style="dark"
            text="Continuer"
            onClick={handleContinue}
            extraCss="w-full"
            icon={<ChevronRight className="h-5 w-5" />}
            iconPosition="right"
          />
        </div>
      </div>
    </div>
  );
}
