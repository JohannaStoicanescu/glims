import { useQuery } from '@tanstack/react-query';

const getReactionsOfAFolder = async (folderId: string) => {
  return await fetch(`/reactions/${folderId}`).then((res) => res.json());
};

const useGetReactionsOfAFolder = (folderId: string) => {
  return useQuery({
    queryKey: ['reactions-of-folder', folderId],
    queryFn: async () => await getReactionsOfAFolder(folderId),
  });
};

export default useGetReactionsOfAFolder;
