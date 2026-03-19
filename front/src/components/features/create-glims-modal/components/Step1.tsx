'use client';

import { useFormContext } from 'react-hook-form';
import { ButtonForm, ControlledInputForm, StepIndicators, ChevronRight } from '@/components';
import { CreateGlimForm } from '../CreateGlimsModal';

interface Step1Props {
  onNext: () => void;
}

export default function Step1({ onNext }: Step1Props) {
  const { trigger } = useFormContext<CreateGlimForm>();

  const handleNext = async () => {
    // Validate current step fields
    const isValid = await trigger(['title', 'description']);
    if (isValid) {
      onNext();
    }
  };

  return (
    <div className="flex flex-col flex-1 gap-8">
      {/* Inputs */}
      <div className="space-y-6 flex-1">
        <ControlledInputForm
          label="Nom du Glims"
          name="title"
          placeholder="Le nom du Glims"
          type="text"
          required
        />
        <ControlledInputForm
          label="Description (facultatif)"
          name="description"
          placeholder="Ajoutez une description"
          type="text"
          required={false}
        />
      </div>

      {/* Footer Actions */}
      <div className="mt-auto space-y-4">
        <StepIndicators
          currentStep={1}
          numberOfSteps={2}
        />

        <ButtonForm
          style="dark"
          text="Continuer"
          icon={<ChevronRight size={20} />}
          iconPosition="right"
          onClick={handleNext}
          extraCss="w-full rounded-xl py-4 text-lg"
        />
      </div>
    </div>
  );
}
