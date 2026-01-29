'use client';

import {
  useCreateFolder,
  useUpdateUsersFolder,
  useDeleteUsersFolders,
  useGetFolderById,
  useGetUsersFoldersList,
  useGetFoldersLinksRefreshed,
  useCreateMedia,
  useDeleteMedia,
  useGetMediaByFolderId,
  useGetMediaById,
  useGetUsersMedia,
  useCreateTags,
  useDeleteTags,
  useGetAllTags,
  useGetTagsAffiliatedToUser,
  useCreateReaction,
  useDeleteReaction,
  useGetAvailableReactions,
  useGetReactionsOfAMedia,
  useAuthClient,
} from '@/hooks';
import { useState, useRef, useEffect } from 'react';
import type { CreateFolderInput, UpdateFolderInput } from '@/types';
import type { UseQueryResult } from '@tanstack/react-query';

type HookResult =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: unknown }
  | { status: 'error'; error: string };

function Result({ result }: { result: HookResult }) {
  if (result.status === 'idle') return <span className="text-gray-400">—</span>;
  if (result.status === 'loading')
    return <span className="text-amber-600">Loading…</span>;
  if (result.status === 'success')
    return (
      <pre className="mt-1 overflow-auto max-h-32 rounded bg-green-50 p-2 text-sm text-green-800">
        {JSON.stringify(result.data, null, 2)}
      </pre>
    );
  return (
    <pre className="mt-1 overflow-auto max-h-32 rounded bg-red-50 p-2 text-sm text-red-800">
      {result.error}
    </pre>
  );
}

function QuerySection({
  title,
  query,
  refetchLabel = 'Refetch',
  requireUserId = false,
  userId,
  inputPlaceholder,
  inputValue,
  onInputChange,
  inputLabel,
}: {
  title: string;
  query: UseQueryResult<unknown, Error>;
  refetchLabel?: string;
  requireUserId?: boolean;
  userId?: string;
  inputPlaceholder?: string;
  inputValue?: string;
  onInputChange?: (v: string) => void;
  inputLabel?: string;
}) {
  const showInput = inputPlaceholder != null && onInputChange != null;
  const disabled = requireUserId ? !userId : showInput ? !(inputValue?.trim()) : false;

  return (
    <section className="rounded-lg border border-gray-200 bg-gray-50 p-4">
      <h2 className="mb-3 text-lg font-semibold text-gray-900">{title}</h2>
      {requireUserId && !userId ? (
        <p className="text-sm text-amber-700">Sign in first.</p>
      ) : (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            {showInput && (
              <>
                {inputLabel && (
                  <label className="text-sm text-gray-600">{inputLabel}</label>
                )}
                <input
                  type="text"
                  placeholder={inputPlaceholder}
                  value={inputValue ?? ''}
                  onChange={(e) => onInputChange(e.target.value)}
                  className="min-w-[140px] rounded border border-gray-300 px-2 py-1 text-sm"
                />
              </>
            )}
            <button
              type="button"
              onClick={() => void query.refetch()}
              disabled={disabled || query.isFetching}
              className="rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50">
              {query.isFetching ? 'Refreshing…' : refetchLabel}
            </button>
          </div>
          {query.isLoading && <p className="text-sm text-amber-600">Loading…</p>}
          {query.isError && (
            <pre className="overflow-auto max-h-48 rounded bg-red-50 p-2 text-sm text-red-800">
              {query.error instanceof Error
                ? query.error.message
                : String(query.error)}
            </pre>
          )}
          {query.data != null && (
            <div className="space-y-2">
              {Array.isArray(query.data) && (
                <p className="text-sm font-medium text-gray-700">
                  {query.data.length} item(s)
                </p>
              )}
              <pre className="overflow-auto max-h-64 rounded bg-green-50 p-2 text-sm text-green-800">
                {JSON.stringify(query.data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function MutationSection({
  title,
  children,
  result,
}: {
  title: string;
  children: React.ReactNode;
  result: HookResult;
}) {
  return (
    <section className="rounded-lg border border-gray-200 bg-gray-50 p-4">
      <h2 className="mb-3 text-lg font-semibold text-gray-900">{title}</h2>
      <div className="space-y-2">{children}</div>
      <div className="mt-3">
        <span className="text-sm font-medium text-gray-600">Result: </span>
        <Result result={result} />
      </div>
    </section>
  );
}

const inputCn =
  'rounded border border-gray-300 px-2 py-1 text-sm min-w-[120px]';
const btnCn =
  'rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50';

export default function TestApiHooksPage() {
  const [createFolderResult, setCreateFolderResult] = useState<HookResult>({
    status: 'idle',
  });
  const [updateFolderResult, setUpdateFolderResult] = useState<HookResult>({
    status: 'idle',
  });
  const [deleteFoldersResult, setDeleteFoldersResult] = useState<HookResult>({
    status: 'idle',
  });
  const [createMediaResult, setCreateMediaResult] = useState<HookResult>({
    status: 'idle',
  });
  const [deleteMediaResult, setDeleteMediaResult] = useState<HookResult>({
    status: 'idle',
  });
  const [createTagsResult, setCreateTagsResult] = useState<HookResult>({
    status: 'idle',
  });
  const [deleteTagsResult, setDeleteTagsResult] = useState<HookResult>({
    status: 'idle',
  });
  const [createReactionResult, setCreateReactionResult] = useState<HookResult>({
    status: 'idle',
  });
  const [deleteReactionResult, setDeleteReactionResult] = useState<HookResult>({
    status: 'idle',
  });

  const [createFolderInput, setCreateFolderInput] =
    useState<CreateFolderInput>({
      title: 'Test folder',
      description: 'Created from test-api-hooks',
    });
  const [updateFolderInput, setUpdateFolderInput] =
    useState<UpdateFolderInput>({ title: 'Updated folder title' });
  const [folderId, setFolderId] = useState('');
  const [folderIds, setFolderIds] = useState('');
  const [getFolderByIdId, setGetFolderByIdId] = useState('');
  const [refreshLinksFolderId, setRefreshLinksFolderId] = useState('');
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [createMediaFolderId, setCreateMediaFolderId] = useState('');
  const [mediaIds, setMediaIds] = useState('');
  const [getMediaByFolderId, setGetMediaByFolderId] = useState('');
  const [getMediaById, setGetMediaById] = useState('');
  const [tagsInput, setTagsInput] = useState('tag1, tag2, tag3');
  const [tagsToDelete, setTagsToDelete] = useState('tag1, tag2');
  const [reactionMediaId, setReactionMediaId] = useState('');
  const [reactionTypeId, setReactionTypeId] = useState('');
  const [reactionId, setReactionId] = useState('');
  const [getReactionsFolderId, setGetReactionsFolderId] = useState('');
  const [getReactionsMediaId, setGetReactionsMediaId] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const authClient = useAuthClient();
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    authClient.getSession().then(({ data }) => {
      setUserId(data?.user?.id ?? '');
    });
  }, [authClient]);

  const foldersQuery = useGetUsersFoldersList(userId);
  const folderByIdQuery = useGetFolderById(getFolderByIdId.trim());
  const refreshLinksQuery = useGetFoldersLinksRefreshed(refreshLinksFolderId.trim());
  const mediaByFolderQuery = useGetMediaByFolderId(getMediaByFolderId.trim());
  const mediaByIdQuery = useGetMediaById(getMediaById.trim());
  const usersMediaQuery = useGetUsersMedia(userId);
  const allTagsQuery = useGetAllTags();
  const tagsAffiliatedQuery = useGetTagsAffiliatedToUser(userId);
  const availableReactionsQuery = useGetAvailableReactions(getReactionsFolderId.trim());
  const reactionsOfMediaQuery = useGetReactionsOfAMedia(getReactionsMediaId.trim());

  const createFolder = useCreateFolder();
  const updateFolder = useUpdateUsersFolder();
  const deleteFolders = useDeleteUsersFolders();
  const createMedia = useCreateMedia();
  const deleteMedia = useDeleteMedia();
  const createTags = useCreateTags();
  const deleteTags = useDeleteTags();
  const createReaction = useCreateReaction();
  const deleteReaction = useDeleteReaction();

  const refetchFolderQueries = () => {
    void foldersQuery.refetch();
    if (getFolderByIdId.trim()) void folderByIdQuery.refetch();
    if (refreshLinksFolderId.trim()) void refreshLinksQuery.refetch();
  };
  const refetchMediaQueries = () => {
    if (getMediaByFolderId.trim()) void mediaByFolderQuery.refetch();
    if (getMediaById.trim()) void mediaByIdQuery.refetch();
    if (userId) void usersMediaQuery.refetch();
  };
  const refetchTagQueries = () => {
    void allTagsQuery.refetch();
    if (userId) void tagsAffiliatedQuery.refetch();
  };
  const refetchReactionQueries = () => {
    if (getReactionsFolderId.trim()) void availableReactionsQuery.refetch();
    if (getReactionsMediaId.trim()) void reactionsOfMediaQuery.refetch();
  };

  const runCreateFolder = async () => {
    setCreateFolderResult({ status: 'loading' });
    try {
      const data = await createFolder.mutateAsync(createFolderInput);
      setCreateFolderResult({ status: 'success', data });
      refetchFolderQueries();
    } catch (e) {
      setCreateFolderResult({
        status: 'error',
        error: e instanceof Error ? e.message : String(e),
      });
    }
  };

  const runUpdateFolder = async () => {
    if (!folderId.trim()) {
      setUpdateFolderResult({ status: 'error', error: 'Folder ID required' });
      return;
    }
    setUpdateFolderResult({ status: 'loading' });
    try {
      const data = await updateFolder.mutateAsync({
        folderId: folderId.trim(),
        data: updateFolderInput,
      });
      setUpdateFolderResult({ status: 'success', data });
      refetchFolderQueries();
    } catch (e) {
      setUpdateFolderResult({
        status: 'error',
        error: e instanceof Error ? e.message : String(e),
      });
    }
  };

  const runDeleteFolders = async () => {
    const ids = folderIds
      .split(',')
      .map((s) => s.trim());
    if (ids.length === 0) {
      setDeleteFoldersResult({
        status: 'error',
        error: 'At least one folder ID required',
      });
      return;
    }
    setDeleteFoldersResult({ status: 'loading' });
    try {
      const data = await deleteFolders.mutateAsync(ids);
      setDeleteFoldersResult({ status: 'success', data });
      refetchFolderQueries();
    } catch (e) {
      setDeleteFoldersResult({
        status: 'error',
        error: e instanceof Error ? e.message : String(e),
      });
    }
  };

  const runCreateMedia = async () => {
    if (!mediaFile) {
      setCreateMediaResult({ status: 'error', error: 'Select a file' });
      return;
    }
    if (!createMediaFolderId.trim()) {
      setCreateMediaResult({ status: 'error', error: 'Folder ID required' });
      return;
    }
    setCreateMediaResult({ status: 'loading' });
    try {
      const data = await createMedia.mutateAsync({
        file: mediaFile,
        folderId: createMediaFolderId.trim(),
      });
      setCreateMediaResult({ status: 'success', data });
      refetchMediaQueries();
    } catch (e) {
      setCreateMediaResult({
        status: 'error',
        error: e instanceof Error ? e.message : String(e),
      });
    }
  };

  const runDeleteMedia = async () => {
    const ids = mediaIds
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    if (ids.length === 0) {
      setDeleteMediaResult({
        status: 'error',
        error: 'At least one media ID required',
      });
      return;
    }
    setDeleteMediaResult({ status: 'loading' });
    try {
      const data = await deleteMedia.mutateAsync(ids);
      setDeleteMediaResult({ status: 'success', data });
      refetchMediaQueries();
    } catch (e) {
      setDeleteMediaResult({
        status: 'error',
        error: e instanceof Error ? e.message : String(e),
      });
    }
  };

  const runCreateTags = async () => {
    const tags = tagsInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    if (tags.length === 0) {
      setCreateTagsResult({
        status: 'error',
        error: 'At least one tag required',
      });
      return;
    }
    setCreateTagsResult({ status: 'loading' });
    try {
      const data = await createTags.mutateAsync(tags);
      setCreateTagsResult({ status: 'success', data });
      refetchTagQueries();
    } catch (e) {
      setCreateTagsResult({
        status: 'error',
        error: e instanceof Error ? e.message : String(e),
      });
    }
  };

  const runDeleteTags = async () => {
    const tags = tagsToDelete
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    if (tags.length === 0) {
      setDeleteTagsResult({
        status: 'error',
        error: 'At least one tag required',
      });
      return;
    }
    setDeleteTagsResult({ status: 'loading' });
    try {
      const data = await deleteTags.mutateAsync(tags);
      setDeleteTagsResult({ status: 'success', data });
      refetchTagQueries();
    } catch (e) {
      setDeleteTagsResult({
        status: 'error',
        error: e instanceof Error ? e.message : String(e),
      });
    }
  };

  const runCreateReaction = async () => {
    if (!reactionMediaId.trim() || !reactionTypeId.trim()) {
      setCreateReactionResult({
        status: 'error',
        error: 'Media ID and Reaction type ID required',
      });
      return;
    }
    setCreateReactionResult({ status: 'loading' });
    try {
      const data = await createReaction.mutateAsync({
        mediaId: reactionMediaId.trim(),
        reactionTypeId: reactionTypeId.trim(),
      });
      setCreateReactionResult({ status: 'success', data });
      refetchReactionQueries();
    } catch (e) {
      setCreateReactionResult({
        status: 'error',
        error: e instanceof Error ? e.message : String(e),
      });
    }
  };

  const runDeleteReaction = async () => {
    if (!reactionId.trim()) {
      setDeleteReactionResult({
        status: 'error',
        error: 'Reaction ID required',
      });
      return;
    }
    setDeleteReactionResult({ status: 'loading' });
    try {
      const data = await deleteReaction.mutateAsync(reactionId.trim());
      setDeleteReactionResult({ status: 'success', data });
      refetchReactionQueries();
    } catch (e) {
      setDeleteReactionResult({
        status: 'error',
        error: e instanceof Error ? e.message : String(e),
      });
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Test API hooks</h1>
        <p className="mt-1 text-sm text-gray-600">
          Call each api-client hook to verify backend connectivity and auth.
          Sign in first, then fill IDs from your backend.
        </p>
      </div>

      <h3 className="text-lg font-semibold text-gray-800">Folders</h3>
      <div className="space-y-4">
        <QuerySection
          title="useGetUsersFoldersList"
          query={foldersQuery}
          refetchLabel="Refetch folders"
          requireUserId
          userId={userId}
        />
        <QuerySection
          title="useGetFolderById"
          query={folderByIdQuery}
          inputPlaceholder="Folder ID"
          inputValue={getFolderByIdId}
          onInputChange={setGetFolderByIdId}
          inputLabel="Folder ID:"
        />
        <QuerySection
          title="useGetFoldersLinksRefreshed"
          query={refreshLinksQuery}
          refetchLabel="Refetch links"
          inputPlaceholder="Folder ID"
          inputValue={refreshLinksFolderId}
          onInputChange={setRefreshLinksFolderId}
          inputLabel="Folder ID:"
        />
        <MutationSection
          title="useCreateFolder"
          result={createFolderResult}>
          <div className="flex flex-wrap gap-2">
            <input
              type="text"
              placeholder="Title"
              value={createFolderInput.title}
              onChange={(e) =>
                setCreateFolderInput((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
              className={inputCn}
            />
            <input
              type="text"
              placeholder="Description (optional)"
              value={createFolderInput.description ?? ''}
              onChange={(e) =>
                setCreateFolderInput((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className={inputCn}
            />
            <button
              type="button"
              onClick={runCreateFolder}
              disabled={createFolder.isPending}
              className={btnCn}>
              Create folder
            </button>
          </div>
        </MutationSection>
        <MutationSection
          title="useUpdateUsersFolder"
          result={updateFolderResult}>
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="text"
              placeholder="Folder ID"
              value={folderId}
              onChange={(e) => setFolderId(e.target.value)}
              className={inputCn}
            />
            <input
              type="text"
              placeholder="New title"
              value={updateFolderInput.title ?? ''}
              onChange={(e) =>
                setUpdateFolderInput((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
              className={inputCn}
            />
            <button
              type="button"
              onClick={runUpdateFolder}
              disabled={updateFolder.isPending}
              className={btnCn}>
              Update folder
            </button>
          </div>
        </MutationSection>
        <MutationSection
          title="useDeleteUsersFolders"
          result={deleteFoldersResult}>
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="text"
              placeholder="Folder IDs (comma-separated)"
              value={folderIds}
              onChange={(e) => setFolderIds(e.target.value)}
              className={`${inputCn} min-w-[200px]`}
            />
            <button
              type="button"
              onClick={runDeleteFolders}
              disabled={deleteFolders.isPending}
              className={btnCn}>
              Delete folders
            </button>
          </div>
        </MutationSection>
      </div>

      <h3 className="text-lg font-semibold text-gray-800">Media</h3>
      <div className="space-y-4">
        <QuerySection
          title="useGetMediaByFolderId"
          query={mediaByFolderQuery}
          refetchLabel="Refetch"
          inputPlaceholder="Folder ID"
          inputValue={getMediaByFolderId}
          onInputChange={setGetMediaByFolderId}
          inputLabel="Folder ID:"
        />
        <QuerySection
          title="useGetMediaById"
          query={mediaByIdQuery}
          refetchLabel="Refetch"
          inputPlaceholder="Media ID"
          inputValue={getMediaById}
          onInputChange={setGetMediaById}
          inputLabel="Media ID:"
        />
        <QuerySection
          title="useGetUsersMedia"
          query={usersMediaQuery}
          refetchLabel="Refetch my media"
          requireUserId
          userId={userId}
        />
        <MutationSection
          title="useCreateMedia"
          result={createMediaResult}>
          <div className="flex flex-wrap items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              onChange={(e) => setMediaFile(e.target.files?.[0] ?? null)}
              className="text-sm"
            />
            <input
              type="text"
              placeholder="Folder ID"
              value={createMediaFolderId}
              onChange={(e) => setCreateMediaFolderId(e.target.value)}
              className={inputCn}
            />
            <button
              type="button"
              onClick={runCreateMedia}
              disabled={createMedia.isPending}
              className={btnCn}>
              Upload media
            </button>
          </div>
        </MutationSection>
        <MutationSection
          title="useDeleteMedia"
          result={deleteMediaResult}>
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="text"
              placeholder="Media IDs (comma-separated)"
              value={mediaIds}
              onChange={(e) => setMediaIds(e.target.value)}
              className={`${inputCn} min-w-[200px]`}
            />
            <button
              type="button"
              onClick={runDeleteMedia}
              disabled={deleteMedia.isPending}
              className={btnCn}>
              Delete media
            </button>
          </div>
        </MutationSection>
      </div>

      <h3 className="text-lg font-semibold text-gray-800">Reactions</h3>
      <div className="space-y-4">
        <QuerySection
          title="useGetAvailableReactions (reactions of folder)"
          query={availableReactionsQuery}
          refetchLabel="Refetch"
          inputPlaceholder="Folder ID"
          inputValue={getReactionsFolderId}
          onInputChange={setGetReactionsFolderId}
          inputLabel="Folder ID:"
        />
        <QuerySection
          title="useGetReactionsOfAMedia"
          query={reactionsOfMediaQuery}
          refetchLabel="Refetch"
          inputPlaceholder="Media ID"
          inputValue={getReactionsMediaId}
          onInputChange={setGetReactionsMediaId}
          inputLabel="Media ID:"
        />
        <MutationSection
          title="useCreateReaction"
          result={createReactionResult}>
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="text"
              placeholder="Media ID"
              value={reactionMediaId}
              onChange={(e) => setReactionMediaId(e.target.value)}
              className={inputCn}
            />
            <input
              type="text"
              placeholder="Reaction type ID"
              value={reactionTypeId}
              onChange={(e) => setReactionTypeId(e.target.value)}
              className={inputCn}
            />
            <button
              type="button"
              onClick={runCreateReaction}
              disabled={createReaction.isPending}
              className={btnCn}>
              Create reaction
            </button>
          </div>
        </MutationSection>
        <MutationSection
          title="useDeleteReaction"
          result={deleteReactionResult}>
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="text"
              placeholder="Reaction ID"
              value={reactionId}
              onChange={(e) => setReactionId(e.target.value)}
              className={inputCn}
            />
            <button
              type="button"
              onClick={runDeleteReaction}
              disabled={deleteReaction.isPending}
              className={btnCn}>
              Delete reaction
            </button>
          </div>
        </MutationSection>
      </div>

      <h3 className="text-lg font-semibold text-gray-800">Tags</h3>
      <div className="space-y-4">
        <QuerySection
          title="useGetAllTags"
          query={allTagsQuery}
          refetchLabel="Refetch all tags"
        />
        <QuerySection
          title="useGetTagsAffiliatedToUser"
          query={tagsAffiliatedQuery}
          refetchLabel="Refetch my tags"
          requireUserId
          userId={userId}
        />
        <MutationSection
          title="useCreateTags"
          result={createTagsResult}>
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="text"
              placeholder="Tags (comma-separated)"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className={`${inputCn} min-w-[200px]`}
            />
            <button
              type="button"
              onClick={runCreateTags}
              disabled={createTags.isPending}
              className={btnCn}>
              Create tags
            </button>
          </div>
        </MutationSection>
        <MutationSection
          title="useDeleteTags"
          result={deleteTagsResult}>
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="text"
              placeholder="Tags to delete (comma-separated)"
              value={tagsToDelete}
              onChange={(e) => setTagsToDelete(e.target.value)}
              className={`${inputCn} min-w-[200px]`}
            />
            <button
              type="button"
              onClick={runDeleteTags}
              disabled={deleteTags.isPending}
              className={btnCn}>
              Delete tags
            </button>
          </div>
        </MutationSection>
      </div>
    </div>
  );
}
