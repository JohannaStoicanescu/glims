export { default as useAuthClient, useSession } from './useAuthClient';

// Folders
export { default as useCreateFolder } from './folders/use-create-folder';
export { default as useDeleteUsersFolders } from './folders/use-delete-users-folders';
export { default as useGetFolderById } from './folders/use-get-folder-by-id';
export { default as useGetUsersFoldersList } from './folders/use-get-users-folders-list';
export { default as useUpdateUsersFolder } from './folders/use-update-users-folder';
export { default as useGetFoldersLinksRefreshed } from './folders/use-get-folders-links-refreshed';

// Media
export { default as useCreateMedia } from './media/use-create-media';
export { default as useDeleteMedia } from './media/use-delete-media';
export { default as useGetMediaByFolderId } from './media/use-get-media-by-folder-id';
export { default as useGetMediaById } from './media/use-get-media-by-id';
export { default as useGetUsersMedia } from './media/use-get-users-media';

// Reactions
export { default as useCreateReaction } from './reactions/use-create-reaction';
export { default as useDeleteReaction } from './reactions/use-delete-reaction';
export { default as useGetAvailableReactions } from './reactions/use-get-reactions-of-a-folder';
export { default as useGetReactionsOfAMedia } from './reactions/use-get-reactions-of-a-media';

// Tags

export { default as useCreateTags } from './tags/use-create-tags';
export { default as useDeleteTags } from './tags/use-delete-tags';
export { default as useGetAllTags } from './tags/use-get-all-tags';
export { default as useGetTagsAffiliatedToUser } from './tags/use-get-tags-affiliated-to-user';
