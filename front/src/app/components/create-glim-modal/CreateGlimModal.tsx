import CreateGlimModalContent from './create-glim-modal-content/CreateGlimModalContent';

interface CreateGlimModalProps {
  readonly open: boolean;
  readonly onClose: () => void;
}

export default function CreateGlimModal({
  open,
  onClose,
}: CreateGlimModalProps) {
  return (
    <CreateGlimModalContent
      open={open}
      onClose={onClose}
    />
  );
}
