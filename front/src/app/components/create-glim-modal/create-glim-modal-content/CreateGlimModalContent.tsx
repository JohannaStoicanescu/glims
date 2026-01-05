import { useEffect, useRef, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import CompleteGlimsInfoStep from '../complete-glims-info-step/CompleteGlimsInfoStep';
import { CloseModalButton } from '../components/CloseModalButton';
import { LeftGlimsIndicator } from '../components/LeftGlimsIndicator';
import {
  defaultFormConfig,
  GlimFormData,
} from '../../../../utils/create-glims-form/default-form-config';
import InvitesAndIconsStep from '../invites-and-icons-step/InvitesAndIconsStep';

interface CreateGlimModalContentProps {
  readonly open: boolean;
  readonly onClose: () => void;
}

export default function CreateGlimModalContent({
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
    <dialog
      open={open}
      className="fixed w-full h-full flex flex-col justify-end bottom-0 inset-0 z-40 md:flex md:items-center md:justify-center md:p-4 bg-transparent"
      aria-labelledby="glims-title">
      <button
        type="button"
        className="absolute inset-0 bg-black/82 backdrop-blur-[1px] z-0"
        onClick={onClose}
        aria-label="Close modal"
      />
      <div
        ref={dialogRef}
        className="relative w-full flex flex-col max-md:justify-center  bg-white rounded-t-2xl overflow-y-auto transition-all duration-200
                   md:w-[80vw] md:max-w-lg md:rounded-2xl lg:max-w-2xl  lg:w-[50vw] xl:w-[35vw] xl:max-w-3xl 2xl:max-w-4xl">
        <CloseModalButton
          onClose={onClose}
          setStep={setStep}
        />

        <FormProvider {...methods}>
          <form className="px-4 py-4 md:px-8 flex-1">
            {/* STEP 1 */}
            {step === 1 && <CompleteGlimsInfoStep setStep={setStep} />}

            {/* STEP 2 */}
            {step === 2 && <InvitesAndIconsStep setStep={setStep} />}

            {/* DIVIDER */}
            <div className="md:border-t md:border-gray-200 mt-4 md:my-6 w-full" />

            {/* TODO: Add real left glims number */}
            <LeftGlimsIndicator remainingGlims={'3'} />
          </form>
        </FormProvider>
      </div>
    </dialog>
  );
}
