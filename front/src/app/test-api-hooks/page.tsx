'use client';

import {
  useCreateFolder,
  useUpdateUsersFolder,
  useDeleteUsersFolders,
  useCreateMedia,
  useDeleteMedia,
  useCreateTags,
  useDeleteTags,
  useCreateReaction,
  useDeleteReaction,
  useGetUsersFoldersList,
  useAuthClient,
} from '@/hooks';
import { useState, useRef, useEffect } from 'react';
import type { CreateFolderInput, UpdateFolderInput } from '@/types';

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

  const [createFolderInput, setCreateFolderInput] = useState<CreateFolderInput>(
    {
      title: 'Test folder',
      description: 'Created from test-api-hooks',
    }
  );
  const [updateFolderInput, setUpdateFolderInput] = useState<UpdateFolderInput>(
    {
      title: 'Updated folder title',
    }
  );
  const [folderId, setFolderId] = useState('');
  const [folderIds, setFolderIds] = useState('');
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [createMediaFolderId, setCreateMediaFolderId] = useState('');
  const [mediaId, setMediaId] = useState('');
  const [tagsInput, setTagsInput] = useState('tag1, tag2, tag3');
  const [tagsToDelete, setTagsToDelete] = useState('tag1, tag2');
  const [reactionMediaId, setReactionMediaId] = useState('');
  const [reactionTypeId, setReactionTypeId] = useState('');
  const [reactionId, setReactionId] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const authClient = useAuthClient();
  const [userId, setUserId] = useState<string>('');
  const foldersQuery = useGetUsersFoldersList(userId);

  useEffect(() => {
    authClient.getSession().then(({ data }) => {
      setUserId(data?.user?.id ?? '');
    });
  }, [authClient]);

  const createFolder = useCreateFolder();
  const updateFolder = useUpdateUsersFolder();
  const deleteFolders = useDeleteUsersFolders();
  const createMedia = useCreateMedia();
  const deleteMedia = useDeleteMedia();
  const createTags = useCreateTags();
  const deleteTags = useDeleteTags();
  const createReaction = useCreateReaction();
  const deleteReaction = useDeleteReaction();

  const runCreateFolder = async () => {
    setCreateFolderResult({ status: 'loading' });
    try {
      const data = await createFolder.mutateAsync(createFolderInput);
      setCreateFolderResult({ status: 'success', data });
      void foldersQuery.refetch();
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
      void foldersQuery.refetch();
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
      .map((s) => s.trim())
      .filter(Boolean);
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
      void foldersQuery.refetch();
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
    } catch (e) {
      setCreateMediaResult({
        status: 'error',
        error: e instanceof Error ? e.message : String(e),
      });
    }
  };

  const runDeleteMedia = async () => {
    if (!mediaId.trim()) {
      setDeleteMediaResult({ status: 'error', error: 'Media ID required' });
      return;
    }
    setDeleteMediaResult({ status: 'loading' });
    try {
      const data = await deleteMedia.mutateAsync(mediaId.trim());
      setDeleteMediaResult({ status: 'success', data });
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
    } catch (e) {
      setDeleteReactionResult({
        status: 'error',
        error: e instanceof Error ? e.message : String(e),
      });
    }
  };

  const Section = ({
    title,
    children,
    result,
  }: {
    title: string;
    children: React.ReactNode;
    result: HookResult;
  }) => (
    <section className="rounded-lg border border-gray-200 bg-gray-50 p-4">
      <h2 className="mb-3 text-lg font-semibold text-gray-900">{title}</h2>
      <div className="space-y-2">{children}</div>
      <div className="mt-3">
        <span className="text-sm font-medium text-gray-600">Result: </span>
        <Result result={result} />
      </div>
    </section>
  );

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Test API hooks</h1>
        <p className="mt-1 text-sm text-gray-600">
          Call each api-client hook to verify backend connectivity and auth.
          Sign in first, then fill IDs from your backend.
        </p>
      </div>

      <section className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <h2 className="mb-3 text-lg font-semibold text-gray-900">
          useGetUsersFoldersList — Your folders
        </h2>
        {!userId ? (
          <p className="text-sm text-amber-700">
            Sign in to list your folders.
          </p>
        ) : (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => void foldersQuery.refetch()}
                disabled={foldersQuery.isFetching}
                className="rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50">
                {foldersQuery.isFetching ? 'Refreshing…' : 'Refetch folders'}
              </button>
            </div>
            {foldersQuery.isLoading && (
              <p className="text-sm text-amber-600">Loading…</p>
            )}
            {foldersQuery.isError && (
              <pre className="overflow-auto max-h-48 rounded bg-red-50 p-2 text-sm text-red-800">
                {foldersQuery.error instanceof Error
                  ? foldersQuery.error.message
                  : String(foldersQuery.error)}
              </pre>
            )}
            {foldersQuery.data != null && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">
                  {Array.isArray(foldersQuery.data)
                    ? `${foldersQuery.data.length} folder(s)`
                    : 'Response'}
                </p>
                <pre className="overflow-auto max-h-64 rounded bg-green-50 p-2 text-sm text-green-800">
                  {JSON.stringify(foldersQuery.data, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
      </section>

      <Section
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
            className="rounded border border-gray-300 px-2 py-1 text-sm"
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
            className="rounded border border-gray-300 px-2 py-1 text-sm"
          />
          <button
            type="button"
            onClick={runCreateFolder}
            disabled={createFolder.isPending}
            className="rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50">
            Create folder
          </button>
        </div>
      </Section>

      <Section
        title="useUpdateUsersFolder"
        result={updateFolderResult}>
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            placeholder="Folder ID"
            value={folderId}
            onChange={(e) => setFolderId(e.target.value)}
            className="rounded border border-gray-300 px-2 py-1 text-sm"
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
            className="rounded border border-gray-300 px-2 py-1 text-sm"
          />
          <button
            type="button"
            onClick={runUpdateFolder}
            disabled={updateFolder.isPending}
            className="rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50">
            Update folder
          </button>
        </div>
      </Section>

      <Section
        title="useDeleteUsersFolders"
        result={deleteFoldersResult}>
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            placeholder="Folder IDs (comma-separated)"
            value={folderIds}
            onChange={(e) => setFolderIds(e.target.value)}
            className="min-w-[200px] rounded border border-gray-300 px-2 py-1 text-sm"
          />
          <button
            type="button"
            onClick={runDeleteFolders}
            disabled={deleteFolders.isPending}
            className="rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50">
            Delete folders
          </button>
        </div>
      </Section>

      <Section
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
            className="rounded border border-gray-300 px-2 py-1 text-sm"
          />
          <button
            type="button"
            onClick={runCreateMedia}
            disabled={createMedia.isPending}
            className="rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50">
            Upload media
          </button>
        </div>
      </Section>

      <Section
        title="useDeleteMedia"
        result={deleteMediaResult}>
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            placeholder="Media ID"
            value={mediaId}
            onChange={(e) => setMediaId(e.target.value)}
            className="rounded border border-gray-300 px-2 py-1 text-sm"
          />
          <button
            type="button"
            onClick={runDeleteMedia}
            disabled={deleteMedia.isPending}
            className="rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50">
            Delete media
          </button>
        </div>
      </Section>

      <Section
        title="useCreateTags"
        result={createTagsResult}>
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            placeholder="Tags (comma-separated)"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            className="min-w-[200px] rounded border border-gray-300 px-2 py-1 text-sm"
          />
          <button
            type="button"
            onClick={runCreateTags}
            disabled={createTags.isPending}
            className="rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50">
            Create tags
          </button>
        </div>
      </Section>

      <Section
        title="useDeleteTags"
        result={deleteTagsResult}>
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            placeholder="Tags to delete (comma-separated)"
            value={tagsToDelete}
            onChange={(e) => setTagsToDelete(e.target.value)}
            className="min-w-[200px] rounded border border-gray-300 px-2 py-1 text-sm"
          />
          <button
            type="button"
            onClick={runDeleteTags}
            disabled={deleteTags.isPending}
            className="rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50">
            Delete tags
          </button>
        </div>
      </Section>

      <Section
        title="useCreateReaction"
        result={createReactionResult}>
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            placeholder="Media ID"
            value={reactionMediaId}
            onChange={(e) => setReactionMediaId(e.target.value)}
            className="rounded border border-gray-300 px-2 py-1 text-sm"
          />
          <input
            type="text"
            placeholder="Reaction type ID"
            value={reactionTypeId}
            onChange={(e) => setReactionTypeId(e.target.value)}
            className="rounded border border-gray-300 px-2 py-1 text-sm"
          />
          <button
            type="button"
            onClick={runCreateReaction}
            disabled={createReaction.isPending}
            className="rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50">
            Create reaction
          </button>
        </div>
      </Section>

      <Section
        title="useDeleteReaction"
        result={deleteReactionResult}>
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            placeholder="Reaction ID"
            value={reactionId}
            onChange={(e) => setReactionId(e.target.value)}
            className="rounded border border-gray-300 px-2 py-1 text-sm"
          />
          <button
            type="button"
            onClick={runDeleteReaction}
            disabled={deleteReaction.isPending}
            className="rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50">
            Delete reaction
          </button>
        </div>
      </Section>
    </div>
  );
}
