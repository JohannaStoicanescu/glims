import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const createReaction = async (reactionData: any) => {
  return axios.post('/reactions', reactionData);
};

const useCreateReaction = () => {
  return useMutation({
    mutationFn: async (reactionData: any) => await createReaction(reactionData),
  });
};

export default useCreateReaction;
