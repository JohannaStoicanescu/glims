import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/utils';

const getTagsAffiliatedToUser = async (userId: string) => {
  const { data } = await apiClient.get(`/tags/user/${userId}`);
  return data;
};

const useGetTagsAffiliatedToUser = (userId: string) => {
  return useQuery({
    queryKey: ['tags-affiliated-to-user', userId],
    queryFn: () => getTagsAffiliatedToUser(userId),
    enabled: !!userId,
  });
};

export default useGetTagsAffiliatedToUser;
