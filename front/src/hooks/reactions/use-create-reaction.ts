import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import type { CreateReactionInput } from '@/types';

const createReaction = async (reactionData: CreateReactionInput) => {
  return axios.post('/reactions', {
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
