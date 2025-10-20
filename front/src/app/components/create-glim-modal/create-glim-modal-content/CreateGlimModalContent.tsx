'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import { CloseModalButton } from '../components/CloseModalButton';
import { CompleteProfileStep } from '../complete-profile-step/CompleteProfileStep';
import { LeftGlimsIndicator } from '../components/LeftGlimsIndicator';
import { InvitesAndIconsStep } from '../invites-and-icons-step/InvitesAndIconsStep';
import { defaultFormConfig, GlimFormData } from './utils/default-form-content';

interface CreateGlimModalContentProps {
  open: boolean;
  onClose: () => void;
}

export function CreateGlimModalContent({
  open,
  onClose,
}: CreateGlimModalContentProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<number>(1);

  const methods = useForm<GlimFormData>(defaultFormConfig);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const t = setTimeout(() => firstFieldRef.current?.focus(), 0);
    return () => {
      document.removeEventListener('keydown', onKey);
      clearTimeout(t);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-40 md:flex md:items-center md:justify-center md:p-4"
      aria-labelledby="glims-title"
      aria-modal="true"
      role="dialog">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[1px] z-0"
        onClick={onClose}
      />

      <div
        ref={dialogRef}
        className="relative w-full bg-white shadow-2xl transition-all overflow-y-auto
                   md:w-[80vw] lg:w-[50vw] xl:w-[35vw] md:h-fit md:max-w-lg md:rounded-2xl md:overflow-hidden
                   lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl duration-200">
        <CloseModalButton onClose={onClose} />

        <FormProvider {...methods}>
          <div className="px-4 py-4 sm:px-6 md:px-8 lg:px-10 sm:py-6 md:py-8">
            {/* STEP 1 */}
            {step === 1 && (
              <CompleteProfileStep
                setStep={setStep}
                onClose={onClose}
              />
            )}

            {/* STEP 2 */}
            {step === 2 && <InvitesAndIconsStep setStep={setStep} />}

            {/* DIVIDER */}
            <div className="border-t border-gray-200 my-4 sm:my-6 w-full" />

            <LeftGlimsIndicator remainingGlims={'3'} />
          </div>
        </FormProvider>
      </div>
    </div>
  );
}
