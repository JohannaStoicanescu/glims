'use client';

import { useState } from 'react';
import { Modal } from '..';
import { useIsMobile } from '@/hooks/use-media-query';
import VisualSection from './components/VisualSection';
import ContentSection from './components/ContentSection';

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STEPS = [
  {
    title: 'Ajoutez vos photos d’événements',
    description:
      'Créez des souvenirs à plusieurs en ajoutant vos photos d’évènements',
    image:
      'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop',
  },
  {
    title: 'Invitez les participants',
    description:
      'Créez des souvenirs à plusieurs en ajoutant des photos ensemble',
    image:
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2664&auto=format&fit=crop',
  },
  {
    title: 'Votez et revivez les meilleurs instants',
    description:
      'Créez des souvenirs à plusieurs en ajoutant des photos ensemble',
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
  },
];

export default function TutorialModal({ isOpen, onClose }: TutorialModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const isMobile = useIsMobile();

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const stepData = STEPS[currentStep];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      showOverlay={true}
      position={isMobile ? 'bottom' : 'center'}
      className={
        isMobile
          ? 'h-full w-full rounded-none'
          : 'max-w-[70%] w-full h-[650px] rounded-3xl overflow-hidden p-0'
      }
      ariaLabelledBy="tutorial-title"
      ariaDescribedBy="tutorial-desc">
      <div className={`flex flex-col h-full ${!isMobile ? 'flex-row' : ''}`}>
        <VisualSection
          isMobile={isMobile}
          stepData={stepData}
          currentStep={currentStep}
          onClose={onClose}
        />

        <ContentSection
          isMobile={isMobile}
          stepData={stepData}
          currentStep={currentStep}
          totalSteps={STEPS.length}
          onNext={handleNext}
          onClose={onClose}
        />
      </div>
    </Modal>
  );
}
