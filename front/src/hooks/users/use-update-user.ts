import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthClient } from '@/hooks';
import { apiClient } from '@/utils';

export interface UpdateUserPayload {
  name?: string;
  firstName?: string;
  lastName?: string;
  newsletter?: boolean;
  image?: string | null;
  email?: string;
}

const useUpdateUser = () => {
  const authClient = useAuthClient();
  const queryClient = useQueryClient();

  const updateProfile = useMutation({
    mutationFn: async (payload: UpdateUserPayload) => {
      const { data } = await apiClient.patch('/users/profile', payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      authClient.getSession();
    },
  });

  const updateProfileImage = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);

      const { data } = await apiClient.post('/users/profile/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      authClient.getSession();
    },
  });

  return {
    ...updateProfile,
    updateProfileImage,
  };
};

export default useUpdateUser;
