import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/utils';

export interface UserProfile {
  id: string;
  name: string;
  image: string | null;
}

const getUserById = async (userId: string): Promise<UserProfile> => {
  const { data } = await apiClient.get(`/users/${userId}`);
  return data;
};

const useGetUserById = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });
};

export default useGetUserById;
