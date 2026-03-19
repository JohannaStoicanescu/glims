import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { MediaService, MediaError, MediaException } from './media.service';
import { MediaRepository } from './media.repository';
import { FoldersRepository } from '../folders/folders.repository';
import { S3StorageService } from '../storage/s3-storage.service';
import type { Media } from '@prisma/client';
import { FolderWithEnrichment } from 'src/lib/types';

vi.mock('crypto', () => ({
  randomUUID: vi.fn(() => 'mocked-uuid'),
}));

describe('MediaService', () => {
  let service: MediaService;
  let repository: MediaRepository;
  let foldersRepository: FoldersRepository;
  let storage: S3StorageService;

  const mockRepository = {
    getMediaById: vi.fn(),
    getUserMedia: vi.fn(),
    countUserMedia: vi.fn(),
    getFolderMedia: vi.fn(),
    countFolderMedia: vi.fn(),
    getUserFolderMedia: vi.fn(),
    countUserFolderMedia: vi.fn(),
    createMedia: vi.fn(),
    deleteManyMedia: vi.fn(),
  };

  const mockFoldersRepository = {
    getFolderById: vi.fn(),
  };

  const mockStorage = {
    uploadFile: vi.fn(),
    downloadFile: vi.fn(),
    fileExists: vi.fn(),
    deleteFile: vi.fn().mockResolvedValue(undefined),
  };

  const mockMedia: Media = {
    id: 'media-1',
    type: 'image/jpeg',
    storage_id: 'storage-1',
    metadata: null,
    folder_id: 'folder-1',
    user_id: 'user-1',
    created_at: new Date(),
    updated_at: new Date(),
  };

  const mockFolder: FolderWithEnrichment = {
    id: 'folder-1',
    title: 'Test Folder',
    description: 'Test Description',
    owner_id: 'user-1',
    upload_url: 'upload-url',
    download_url: 'download-url',
    has_reached_limit: false,
    password: null,
    created_at: new Date(),
    updated_at: new Date(),
    members: [],
    available_reactions: [],
    _count: { media: 0 },
    media: [],
  };

  beforeEach(() => {
    repository = mockRepository as unknown as MediaRepository;
    foldersRepository = mockFoldersRepository as unknown as FoldersRepository;
    storage = mockStorage as unknown as S3StorageService;
    service = new MediaService(repository, foldersRepository, storage);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('getMediaById', () => {
    it('should return media when user is the owner', async () => {
      mockRepository.getMediaById.mockResolvedValue(mockMedia);
      mockFoldersRepository.getFolderById.mockResolvedValue(mockFolder);

      const result = await service.getMediaById('media-1', 'user-1');

      expect(result).toEqual(mockMedia);
      expect(repository.getMediaById).toHaveBeenCalledWith('media-1');
    });

    it('should throw MEDIA_NOT_FOUND when media does not exist', async () => {
      mockRepository.getMediaById.mockResolvedValue(null);

      await expect(
        service.getMediaById('non-existent', 'user-1')
      ).rejects.toThrow(new MediaException(MediaError.MEDIA_NOT_FOUND));
    });

    it('should throw FORBIDDEN when user is not the owner', async () => {
      const otherUserFolder = { ...mockFolder, owner_id: 'user-2' };
      mockRepository.getMediaById.mockResolvedValue(mockMedia);
      mockFoldersRepository.getFolderById.mockResolvedValue(otherUserFolder);

      await expect(service.getMediaById('media-1', 'user-1')).rejects.toThrow(
        new MediaException(MediaError.FORBIDDEN)
      );
    });
  });

  describe('getUserMedia', () => {
    it('should return paginated media with files', async () => {
      const mockMediaWithFolder = {
        ...mockMedia,
        folder: { title: 'Test Folder' },
      };
      const mockFile = Buffer.from('test file content');

      mockRepository.getUserMedia.mockResolvedValue([mockMediaWithFolder]);
      mockRepository.countUserMedia.mockResolvedValue(1);
      mockStorage.fileExists.mockResolvedValue(true);
      mockStorage.downloadFile.mockResolvedValue(mockFile);

      const result = await service.getUserMedia('user-1', 'user-1', 1, 10);

      expect(result.data).toHaveLength(1);
      expect(result.data[0]).toEqual({
        media: mockMediaWithFolder,
        file: mockFile,
        contentType: 'image/jpeg',
        folder_title: 'Test Folder',
      });
      expect(result.total).toBe(1);
    });

    it('should filter out media with missing files', async () => {
      const mockMediaList = [
        { ...mockMedia, id: 'media-1', storage_id: 'storage-1' },
        { ...mockMedia, id: 'media-2', storage_id: 'storage-2' },
      ];
      const mockFile = Buffer.from('test file content');

      mockRepository.getUserMedia.mockResolvedValue(mockMediaList);
      mockRepository.countUserMedia.mockResolvedValue(2);
      mockStorage.fileExists
        .mockResolvedValueOnce(true)
        .mockResolvedValueOnce(false);
      mockStorage.downloadFile.mockResolvedValue(mockFile);

      const result = await service.getUserMedia('user-1', 'user-1', 1, 10);

      expect(result.data).toHaveLength(1);
      expect(result.data[0].media.id).toBe('media-1');
    });

    it('should throw FORBIDDEN when requesting other user media', async () => {
      await expect(
        service.getUserMedia('user-2', 'user-1', 1, 10)
      ).rejects.toThrow(new MediaException(MediaError.FORBIDDEN));
    });
  });

  describe('getFolderMedia', () => {
    it('should return paginated media with files for folder', async () => {
      const mockMediaList = [mockMedia];
      const mockFile = Buffer.from('test file content');

      mockFoldersRepository.getFolderById.mockResolvedValue(mockFolder);
      mockRepository.getFolderMedia.mockResolvedValue(mockMediaList);
      mockRepository.countFolderMedia.mockResolvedValue(1);
      mockStorage.fileExists.mockResolvedValue(true);
      mockStorage.downloadFile.mockResolvedValue(mockFile);

      const result = await service.getFolderMedia('folder-1', 'user-1', 1, 10);

      expect(result.data).toHaveLength(1);
      expect(result.data[0]).toEqual({
        media: mockMedia,
        file: mockFile,
        contentType: 'image/jpeg',
      });
    });

    it('should filter out media with missing files', async () => {
      const mockMediaList = [mockMedia];

      mockFoldersRepository.getFolderById.mockResolvedValue(mockFolder);
      mockRepository.getFolderMedia.mockResolvedValue(mockMediaList);
      mockRepository.countFolderMedia.mockResolvedValue(1);
      mockStorage.fileExists.mockResolvedValue(false);

      const result = await service.getFolderMedia('folder-1', 'user-1', 1, 10);

      expect(result.data).toHaveLength(0);
    });
  });

  describe('getFolderUserMedia', () => {
    it('should return paginated media with files for user in folder', async () => {
      const mockMediaList = [mockMedia];
      const mockFile = Buffer.from('test file content');

      mockFoldersRepository.getFolderById.mockResolvedValue(mockFolder);
      mockRepository.getUserFolderMedia.mockResolvedValue(mockMediaList);
      mockRepository.countUserFolderMedia.mockResolvedValue(1);
      mockStorage.fileExists.mockResolvedValue(true);
      mockStorage.downloadFile.mockResolvedValue(mockFile);

      const result = await service.getFolderUserMedia(
        'folder-1',
        'user-1',
        'user-1',
        1,
        10
      );

      expect(result.data).toHaveLength(1);
      expect(result.data[0]).toEqual({
        media: mockMedia,
        file: mockFile,
        contentType: 'image/jpeg',
      });
    });
  });

  describe('createMedia', () => {
    it('should create media and upload file', async () => {
      const fileBuffer = Buffer.from('test file content');
      const createData = {
        file: fileBuffer,
        type: 'image/jpeg',
        folder_id: 'folder-1',
        metadata: { width: 100, height: 100 },
      };

      mockFoldersRepository.getFolderById.mockResolvedValue(mockFolder);
      mockStorage.uploadFile.mockResolvedValue('storage-id');
      mockRepository.createMedia.mockResolvedValue(mockMedia);

      const result = await service.createMedia(createData, 'user-1');

      expect(result).toEqual(mockMedia);
      expect(storage.uploadFile).toHaveBeenCalledWith(
        expect.stringContaining('folders/folder-1/'),
        fileBuffer,
        'image/jpeg'
      );
      expect(repository.createMedia).toHaveBeenCalledWith(
        expect.objectContaining({
          storage_id: 'storage-id',
          type: 'image/jpeg',
          metadata: { width: 100, height: 100 },
          folder: { connect: { id: 'folder-1' } },
          user: { connect: { id: 'user-1' } },
        })
      );
    });

    it('should throw FOLDER_NOT_FOUND when folder does not exist', async () => {
      const createData = {
        file: Buffer.from('test'),
        type: 'image/jpeg',
        folder_id: 'non-existent',
      };

      mockFoldersRepository.getFolderById.mockResolvedValue(null);

      await expect(service.createMedia(createData, 'user-1')).rejects.toThrow(
        new MediaException(MediaError.FOLDER_NOT_FOUND)
      );
    });

    it('should throw FORBIDDEN when user is not folder owner', async () => {
      const createData = {
        file: Buffer.from('test'),
        type: 'image/jpeg',
        folder_id: 'folder-1',
      };

      const otherUserFolder = { ...mockFolder, owner_id: 'user-2' };
      mockFoldersRepository.getFolderById.mockResolvedValue(otherUserFolder);

      await expect(service.createMedia(createData, 'user-1')).rejects.toThrow(
        new MediaException(MediaError.FORBIDDEN)
      );
    });
  });

  describe('deleteMultipleMedia', () => {
    it('should delete media when user is owner', async () => {
      mockRepository.getMediaById.mockResolvedValue(mockMedia);
      mockFoldersRepository.getFolderById.mockResolvedValue(mockFolder);
      mockRepository.deleteManyMedia.mockResolvedValue({ count: 1 });

      const result = await service.deleteMultipleMedia(['media-1'], 'user-1');

      expect(result).toEqual([mockMedia]);
      expect(repository.getMediaById).toHaveBeenCalledWith('media-1');
      expect(storage.deleteFile).toHaveBeenCalledWith('storage-1');
      expect(repository.deleteManyMedia).toHaveBeenCalledWith({
        id: 'media-1',
      });
    });

    it('should delete multiple media when user owns all', async () => {
      const mockMedia2 = {
        ...mockMedia,
        id: 'media-2',
        storage_id: 'storage-2',
      };
      mockRepository.getMediaById
        .mockResolvedValueOnce(mockMedia)
        .mockResolvedValueOnce(mockMedia2);
      mockFoldersRepository.getFolderById.mockResolvedValue(mockFolder);
      mockRepository.deleteManyMedia.mockResolvedValue({ count: 1 });

      const result = await service.deleteMultipleMedia(
        ['media-1', 'media-2'],
        'user-1'
      );

      expect(result).toEqual([mockMedia, mockMedia2]);
      expect(storage.deleteFile).toHaveBeenCalledTimes(2);
    });

    it('should throw FORBIDDEN when user is not owner', async () => {
      const otherUserMedia = { ...mockMedia, user_id: 'user-2' };
      mockRepository.getMediaById.mockResolvedValue(otherUserMedia);
      mockFoldersRepository.getFolderById.mockResolvedValue({
        ...mockFolder,
        owner_id: 'user-2',
      });

      await expect(
        service.deleteMultipleMedia(['media-1'], 'user-1')
      ).rejects.toThrow(new MediaException(MediaError.FORBIDDEN));
    });
  });

  describe('MediaException', () => {
    it('should create exception with correct error type', () => {
      const exception = new MediaException(MediaError.MEDIA_NOT_FOUND);

      expect(exception).toBeInstanceOf(Error);
      expect(exception.type).toBe(MediaError.MEDIA_NOT_FOUND);
      expect(exception.message).toBe(MediaError.MEDIA_NOT_FOUND);
    });

    it('should create FORBIDDEN exception', () => {
      const exception = new MediaException(MediaError.FORBIDDEN);

      expect(exception.type).toBe(MediaError.FORBIDDEN);
      expect(exception.message).toBe(MediaError.FORBIDDEN);
    });
  });
});
