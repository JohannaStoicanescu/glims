'use client';

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ConfirmationModal, Modal } from '@/components';
import ModalHeader from './components/ModalHeader';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import { DoorOpen } from '@/components';
import { useCreateFolder } from '@/hooks';

interface CreateGlimsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export type GlimRole = 'Lecteur' | 'Éditeur' | 'Administrateur';

export interface GlimMember {
  email: string;
  role: GlimRole;
}

export interface CreateGlimForm {
  title: string;
  description: string;
  members: GlimMember[];
  reactionsEnabled: boolean;
  reactions: string[];
}

export default function CreateGlimsModal({
  isOpen,
  onClose,
}: CreateGlimsModalProps) {
  const [step, setStep] = useState(1);
  const [showInviteDetails, setShowInviteDetails] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const createFolder = useCreateFolder();

  const methods = useForm<CreateGlimForm>({
    defaultValues: {
      title: '',
      description: '',
      members: [],
      reactionsEnabled: false,
      reactions: ['❤️', '🔥', '👏', '😂', '😮'], // Default reactions
    },
  });

  const {
    formState: { isDirty },
  } = methods;

  const handleClose = () => {
    setStep(1);
    setShowInviteDetails(false);
    methods.reset();
    onClose();
  };

  const requestClose = () => {
    if (isDirty) {
      setIsConfirmationModalOpen(true);
    } else {
      handleClose();
    }
  };

  const handleBack = () => {
    if (showInviteDetails) {
      setShowInviteDetails(false);
    } else if (step === 2) {
      setStep(1);
    } else {
      requestClose();
    }
  };

  const onSubmit = (data: CreateGlimForm) => {
    createFolder.mutate(
      { title: data.title, description: data.description },
      { onSuccess: handleClose }
    );
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={requestClose}
        showOverlay
        className="w-full md:max-w-xl rounded-t-3xl md:rounded-3xl">
        <div className="flex flex-col max-h-[90vh]">
          <ModalHeader
            title={step === 1 ? 'Créer un Glims' : 'Inviter des membres'}
            onBack={handleBack}
            onClose={requestClose}
          />

          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="p-6 pt-2 flex flex-col gap-6 flex-1 overflow-y-auto">
              {step === 1 && <Step1 onNext={() => setStep(2)} />}
              {step === 2 && (
                <Step2
                  showInviteDetails={showInviteDetails}
                  setShowInviteDetails={setShowInviteDetails}
                />
              )}

              {!showInviteDetails && (
                <div className="mt-auto text-center">
                  <p className="text-sm text-gray-500">
                    Encore{' '}
                    <span className="text-orange-600 font-bold">
                      💥 3 Glims
                    </span>{' '}
                    disponibles avec votre compte.
                  </p>
                </div>
              )}
            </form>
          </FormProvider>
        </div>
      </Modal>

      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        title="Quitter la création"
        message="Êtes-vous sûr ? Les informations déjà renseignées seront perdues."
        confirmButtonText="Quitter"
        cancelButtonText="Annuler"
        onConfirm={handleClose}
        onCancel={() => setIsConfirmationModalOpen(false)}
        icon={<DoorOpen size={48} />}
      />
    </>
  );
}
