'use client';

import { Modal } from '..';
import { ConfirmationModalContent } from './components/ConfirmationModalContent';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  readonly icon: React.ReactNode;
  readonly title: string;
  readonly message: string;
  readonly confirmButtonText: string;
  readonly cancelButtonText: string;
  readonly onConfirm: () => void;
  readonly onCancel?: () => void;
  readonly radial?: boolean;
  className?: string;
  containerClassName?: string;
  position?: 'center' | 'bottom' | 'custom';
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  icon,
  title,
  message,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
  onCancel,
  radial = false,
  className = '',
  containerClassName = '',
  position = 'center',
}: ConfirmationModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      ariaLabelledBy="confirmation-modal-title"
      ariaDescribedBy="confirmation-modal-description"
      className={className}
      containerClassName={containerClassName}
      position={position}>
      <ConfirmationModalContent
        icon={icon}
        title={title}
        message={message}
        confirmButtonText={confirmButtonText}
        cancelButtonText={cancelButtonText}
        onConfirm={() => {
          onConfirm();
          onClose();
        }}
        onCancel={() => {
          if (onCancel) onCancel();
          onClose();
        }}
        radial={radial}
      />
    </Modal>
  );
}
