import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/utils';
import { MediaItem } from './use-get-media-by-folder-id';

interface RawMediaWithFile {
  media: {
    id: string;
    type: string;
    storage_id: string;
    folder_id: string;
    user_id: string;
    metadata?: unknown;
    created_at: string;
    updated_at: string;
  };
  file: { type: 'Buffer'; data: number[] } | string;
  contentType: string;
  folder_title?: string;
}

interface PaginatedMediaResponse {
  data: RawMediaWithFile[];
  total: number;
  page: number;
  limit: number;
}

function bufferToDataUrl(
  file: { type: 'Buffer'; data: number[] } | string,
  contentType: string
): string {
  if (typeof file === 'string') {
    return `data:${contentType};base64,${file}`;
  }
  const bytes = new Uint8Array(file.data);
  let binary = '';
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  const base64 = btoa(binary);
  return `data:${contentType};base64,${base64}`;
}

export interface UserMediaItem extends MediaItem {
  folder_title?: string;
}

const getUsersMedia = async (userId: string): Promise<UserMediaItem[]> => {
  // Use a high limit to get "all" photos as requested,
  // or the UI will need to handle pagination
  const { data } = await apiClient.get<PaginatedMediaResponse>(
    `/media/user/${userId}?limit=1000`
  );

  return data.data.map((item) => ({
    ...item.media,
    url: bufferToDataUrl(item.file, item.contentType),
    contentType: item.contentType,
    folder_title: item.folder_title,
  }));
};

const useGetUsersMedia = (userId: string) => {
  return useQuery({
    queryKey: ['users-media', userId],
    queryFn: () => getUsersMedia(userId),
    enabled: !!userId,
  });
};

export default useGetUsersMedia;
