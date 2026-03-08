import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/utils';

const getAllTags = async () => {
  const { data } = await apiClient.get('/tags');
  return data;
};

const useGetAllTags = () => {
  return useQuery({
    queryKey: ['all-tags'],
    queryFn: getAllTags,
  });
};

export default useGetAllTags;
