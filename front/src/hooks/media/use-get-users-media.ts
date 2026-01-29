import { useQuery } from '@tanstack/react-query';

const getUsersMedia = async (userId: string) => {
  return await fetch(`/media/user/${userId}`).then((res) => res.json());
};

const useGetUsersMedia = (userId: string) => {
  return useQuery({
    queryKey: ['users-media', userId],
    queryFn: async () => await getUsersMedia(userId),
  });
};

export default useGetUsersMedia;
