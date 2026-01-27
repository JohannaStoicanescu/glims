import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/utils';

const deleteReaction = async (reactionId: string) => {
  return apiClient.delete(`/reactions/${reactionId}`);
};

const useDeleteReaction = () => {
  return useMutation({
    mutationFn: async (reactionId: string) => await deleteReaction(reactionId),
  });
};

export default useDeleteReaction;
