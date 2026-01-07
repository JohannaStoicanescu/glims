import { useQuery } from '@tanstack/react-query';

const getUsersFoldersList = async () => {
  return await fetch('/folders').then((res) => res.json());
};

const useGetUsersFoldersList = (userId: string) => {
  return useQuery({
    queryKey: ['folders-list', userId],
    queryFn: async () => await getUsersFoldersList(),
  });
};

export default useGetUsersFoldersList;
