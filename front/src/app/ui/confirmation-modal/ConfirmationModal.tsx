'use client';

import { useState } from 'react';

import { ConfirmationModalContent } from './components/ConfirmationModalContent';

interface ConfirmationModalProps {
  readonly icon: React.ReactNode;
  readonly title: string;
  readonly message: string;
  readonly confirmButtonText: string;
  readonly cancelButtonText: string;
  readonly onConfirm: () => void;
  readonly onCancel: () => void;
  readonly radial?: boolean;
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
    <dialog
      open={showModal}
      className="fixed inset-0 z-20 flex items-center justify-center backdrop-blur-[1px] bg-transparent p-0 m-0 w-full h-full max-w-none max-h-none"
      onClick={(e) => {
        // Only close if clicking on the dialog backdrop itself
        if (e.target === e.currentTarget) {
          setShowModal(false);
        }
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          setShowModal(false);
        }
      }}
      aria-labelledby="confirmation-modal-title">
      <div
        className="w-11/12 h-1/2 md:w-1/2 lg:w-2/6"
        onClick={(e) => e.stopPropagation()}
        role="presentation">
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
    </dialog>
  );
}
