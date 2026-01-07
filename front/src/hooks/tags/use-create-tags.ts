import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const createTags = async (tags: string[]) => {
  return await axios.post('/tags', { tags });
};

const useCreateTags = () => {
  return useMutation({
    mutationFn: async (tags: string[]) => await createTags(tags),
  });
};

export default useCreateTags;
