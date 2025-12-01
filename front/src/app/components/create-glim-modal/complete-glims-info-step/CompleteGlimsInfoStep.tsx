import { ButtonForm, ControlledInputForm, StepIndicators } from '@/app/ui';
import { useFormContext } from 'react-hook-form';
import { AccessibilityToTheGlimCheckboxes } from './components/AccessibilityToTheGlimCheckboxes';
import { ChevronRight } from '@/app/ui/icons';
import { UsersRoleSelection } from './components/UsersRoleSelection';

interface CompleteGlimsInfoStepProps {
  readonly setStep: (step: number) => void;
}

export default function CompleteGlimsInfoStep({
  setStep,
}: CompleteGlimsInfoStepProps) {
  const { trigger } = useFormContext();

  const handleContinueCreation = async () => {
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
        className="text-2xl md:text-center font-semibold">
        Créer un Glims
      </h2>
      <ControlledInputForm
        type="text"
        label="Nom du Glims"
        name="name"
        placeholder="Le nom du Glims"
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

        <ButtonForm
          style="dark"
          text="Continuer"
          onClick={handleContinueCreation}
          extraCss="w-full"
          icon={<ChevronRight className="h-5 w-5" />}
          iconPosition="right"
        />
      </div>
    </div>
  );
}
