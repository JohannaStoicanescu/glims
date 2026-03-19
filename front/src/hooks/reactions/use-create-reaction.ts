import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateReactionInput } from '@/types';
import { apiClient } from '@/utils';

const createReaction = async (reactionData: CreateReactionInput) => {
  const { data } = await apiClient.post('/reactions', {
    media_id: reactionData.mediaId,
    reaction_type_id: reactionData.reactionTypeId,
  });
  return data;
};

const useCreateReaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reactionData: CreateReactionInput) =>
      await createReaction(reactionData),
    onSuccess: () => {
      // Invalidate media-by-folder to refresh reactions
      // We don't have the folderId directly here but we can invalidate all media queries
      // or the specific one if we had the folderId.
      // For simplicity, invalidate all that might be relevant.
      queryClient.invalidateQueries({ queryKey: ['media-by-folder'] });
      queryClient.invalidateQueries({ queryKey: ['users-media'] });
    },
  });
};

export default useCreateReaction;
