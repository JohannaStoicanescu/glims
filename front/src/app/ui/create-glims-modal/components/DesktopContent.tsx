'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { useState } from 'react';

import { ButtonForm, StepIndicators } from '../..';
import GlimsInfoStep from './GlimsInfoStep';
import InviteMembersStep from './InviteMembersStep';

interface DesktopContentProps {
  onClose: () => void;
  availableGlims: number;
}

export default function DesktopContent({
  onClose,
  availableGlims,
}: DesktopContentProps) {
  const [displayedStep, setDisplayedStep] = useState(1);

  const methods = useForm();
  const { handleSubmit, getValues } = methods;

  const handleSubmitForm = () => {
    if (displayedStep === 1) {
      setDisplayedStep(2);
    } else {
      // TODO: create glims
      console.log('Form values:', getValues());
      onClose();
    }
  };

  return (
    <div className="hidden md:flex fixed inset-0 items-center justify-center z-50">
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-auto p-8 z-50 flex-col">
        <button
          className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-700"
          onClick={onClose}
          aria-label="Fermer la modale">
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
                type="submit"
                text={
                  <>
                    Continuer <span className="ml-2">&gt;</span>
                  </>
                }
                style="dark"
                extraCss="w-full"
                iconPosition="right"
              />
            )}
            {displayedStep === 2 && (
              <ButtonForm
                type="submit"
                text={
                  <>
                    Créer <span className="ml-2">&gt;</span>
                  </>
                }
                style="dark"
                extraCss="w-full"
                iconPosition="right"
              />
            )}
          </form>
        </FormProvider>

        {/* Info block */}
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
    </div>
  );
}
