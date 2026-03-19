'use client';

import { Modal } from '@/components';
import { useCreateReaction } from '@/hooks';

interface ReactionType {
  id: string;
  name: string;
  svg: string;
}

interface ReactionPickerProps {
  isOpen: boolean;
  onClose: () => void;
  mediaId: string;
  availableReactions: ReactionType[];
}

export default function ReactionPicker({
  isOpen,
  onClose,
  mediaId,
  availableReactions,
}: ReactionPickerProps) {
  const createReaction = useCreateReaction();

  const handleReactionClick = async (reactionTypeId: string) => {
    try {
      await createReaction.mutateAsync({
        mediaId,
        reactionTypeId,
      });
      onClose();
    } catch (error) {
      console.error('Failed to create reaction:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      position="center"
      className="w-auto max-w-sm rounded-3xl p-6">
      <div>
        <h3 className="text-lg font-bold text-center mb-6">
          Réagir à la photo
        </h3>
        <div className="flex flex-wrap justify-center gap-4">
          {availableReactions.length > 0 ? (
            availableReactions.map((rt) => (
              <button
                key={rt.id}
                onClick={() => handleReactionClick(rt.id)}
                className="w-14 h-14 flex items-center justify-center rounded-2xl bg-slate-50 hover:bg-orange-50 hover:scale-110 transition-all cursor-pointer border border-transparent hover:border-orange-200 group"
                title={rt.name}>
                <div
                  className="w-10 h-10 group-hover:drop-shadow-sm"
                  dangerouslySetInnerHTML={{ __html: rt.svg }}
                />
              </button>
            ))
          ) : (
            <p className="text-slate-500 text-center text-sm">
              Aucune réaction disponible pour ce Glims.
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
}
