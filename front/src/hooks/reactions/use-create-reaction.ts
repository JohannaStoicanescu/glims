import { useMutation } from '@tanstack/react-query';
import type { CreateReactionInput } from '@/types';
import { apiClient } from '@/utils';

const createReaction = async (reactionData: CreateReactionInput) => {
  return apiClient.post('/reactions', {
    media_id: reactionData.mediaId,
    reaction_type_id: reactionData.reactionTypeId,
  });
};

const useCreateReaction = () => {
  return useMutation({
    mutationFn: async (reactionData: CreateReactionInput) =>
      await createReaction(reactionData),
  });
};

export default useCreateReaction;
