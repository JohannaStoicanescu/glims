import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const deleteReaction = async (reactionId: string) => {
  return axios.delete(`/reactions/${reactionId}`);
};

const useDeleteReaction = (reactionId: string) => {
  return useMutation({
    mutationFn: async () => await deleteReaction(reactionId),
  });
};

export default useDeleteReaction;
