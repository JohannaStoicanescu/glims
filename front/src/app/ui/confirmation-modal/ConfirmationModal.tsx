'use client';

import { useState } from 'react';

import { ConfirmationModalContent } from './components/ConfirmationModalContent';

interface ConfirmationModalProps {
  icon: React.ReactNode;
  title: string;
  message: string;
  confirmButtonText: string;
  cancelButtonText: string;
  onConfirm: () => void;
  onCancel: () => void;
  radial?: boolean;
}

export default function ConfirmationModal({
  icon,
  title,
  message,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
  onCancel,
  radial = false,
}: ConfirmationModalProps) {
  //TODO: handle show/hide from parent component : remove when implemented
  const [showModal, setShowModal] = useState(true);

  return (
    showModal && (
      <div
        className="fixed z-20 m-auto inset-y-0 inset-x-0 w-11/12 h-1/2 md:w-1/2 lg:w-2/6 backdrop-blur-[1px]"
        onClick={() => setShowModal(false)}
        aria-labelledby="confirmation-modal-title"
        aria-modal="true"
        role="dialog">
        <ConfirmationModalContent
          icon={icon}
          title={title}
          message={message}
          confirmButtonText={confirmButtonText}
          cancelButtonText={cancelButtonText}
          onConfirm={() => {
            setShowModal(false);
            onConfirm();
          }}
          onCancel={() => {
            setShowModal(false);
            onCancel();
          }}
          radial={radial}
        />
      </div>
    )
  );
}
