'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { useState } from 'react';

import { ButtonForm, StepIndicators } from '../..';
import GlimsInfoStep from './GlimsInfoStep';
import InviteMembersStep from './InviteMembersStep';

interface MobileContentProps {
  onClose: () => void;
  availableGlims: number;
}

export default function MobileContent({
  onClose,
  availableGlims,
}: MobileContentProps) {
  const [displayedStep, setDisplayedStep] = useState(1);

  const methods = useForm();
  const { handleSubmit } = methods;

  const handleSubmitForm = () => {
    if (displayedStep === 1) {
      setDisplayedStep(2);
    } else {
      // TODO: create glims
      onClose();
    }
  };

  return (
    <div
      className="md:hidden fixed inset-x-0 bottom-0 bg-white rounded-t-2xl shadow-xl z-50 flex flex-col p-6"
      style={{ height: '60vh' }}>
      <button
        className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-700"
        onClick={onClose}
        aria-label="Close modal">
        ×
      </button>
      <span
        className="text-sm font-medium text-gray-500 mb-2 cursor-pointer"
        onClick={onClose}>
        &lt; Retour
      </span>

      <FormProvider {...methods}>
        <form
          className="flex flex-col gap-4 mt-6"
          onSubmit={handleSubmit(() => handleSubmitForm())}>
          {displayedStep === 1 && <GlimsInfoStep />}
          {displayedStep === 2 && <InviteMembersStep />}

          <StepIndicators
            currentStep={displayedStep}
            numberOfSteps={2}
          />

          {displayedStep === 1 && (
            <ButtonForm
              text="Continuer"
              style="dark"
              extraCss="w-full"
              iconPosition="right"
              onClick={() => setDisplayedStep(2)}
            />
          )}
          {displayedStep === 2 && (
            <ButtonForm
              type="submit"
              text="Créer"
              style="dark"
              extraCss="w-full"
              iconPosition="right"
            />
          )}
        </form>
      </FormProvider>

      {/* LEFT GLIMS INFO */}
      <div className="mt-2 text-center text-base text-gray-500">
        <span className="inline-flex items-center gap-1">
          <span className="text-orange-500 text-lg">●</span>
          <span>
            Encore{' '}
            <span className="font-bold text-orange-600">
              {availableGlims} Glims
            </span>{' '}
            disponibles avec votre compte.
          </span>
        </span>
      </div>
    </div>
  );
}
