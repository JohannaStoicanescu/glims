import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const deleteTags = async (tags: string[]) => {
  return await axios.delete('/tags', { data: { tags } });
};

const useDeleteTags = () => {
  return useMutation({
    mutationFn: async (tags: string[]) => await deleteTags(tags),
  });
};

export default useDeleteTags;
