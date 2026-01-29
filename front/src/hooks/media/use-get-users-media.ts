import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/utils';

const getUsersMedia = async (userId: string) => {
  const { data } = await apiClient.get(`/media/user/${userId}`);
  return data;
};

const useGetUsersMedia = (userId: string) => {
  return useQuery({
    queryKey: ['users-media', userId],
    queryFn: () => getUsersMedia(userId),
    enabled: !!userId,
  });
};

export default useGetUsersMedia;
