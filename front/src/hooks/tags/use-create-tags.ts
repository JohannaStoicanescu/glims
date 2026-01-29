import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/utils';

const createTags = async (tags: string[]) => {
  return await apiClient.post('/tags', { tags });
};

const useCreateTags = () => {
  return useMutation({
    mutationFn: async (tags: string[]) => await createTags(tags),
  });
};

export default useCreateTags;
