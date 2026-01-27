import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/utils';

const deleteTags = async (tags: string[]) => {
  return await apiClient.delete('/tags', { data: { tags } });
};

const useDeleteTags = () => {
  return useMutation({
    mutationFn: async (tags: string[]) => await deleteTags(tags),
  });
};

export default useDeleteTags;
