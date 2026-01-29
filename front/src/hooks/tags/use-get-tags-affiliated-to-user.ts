import { useQuery } from '@tanstack/react-query';

const getTagsAffiliatedToUser = async (userId: string) => {
  return await fetch(`/tags/user/${userId}`).then((res) => res.json());
};

const useGetTagsAffiliatedToUser = (userId: string) => {
  return useQuery({
    queryKey: ['tags-affiliated-to-user', userId],
    queryFn: async () => await getTagsAffiliatedToUser(userId),
  });
};

export default useGetTagsAffiliatedToUser;
