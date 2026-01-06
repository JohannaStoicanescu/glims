/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type  */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  FoldersService,
  FoldersError,
  FoldersException,
} from './folders.service';
import { FoldersRepository } from './folders.repository';
import type { Folder } from '@prisma/client';

vi.mock('crypto', () => ({
  randomUUID: vi.fn(() => 'mocked-uuid'),
}));

describe('FoldersService', () => {
  let service: FoldersService;
  let repository: FoldersRepository;

  const mockRepository = {
    getFolderById: vi.fn(),
    getUserFolders: vi.fn(),
    createFolder: vi.fn(),
    updateFolder: vi.fn(),
    deleteFolder: vi.fn(),
  };

  const mockTagsService = {
    prepareTagsConnect: vi.fn(),
  };

  const mockFolder: Folder = {
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
  };

  beforeEach(() => {
    repository = mockRepository as any;
    service = new FoldersService(repository, mockTagsService as any);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('getFolderById', () => {
    it('should return a folder when user is the owner', async () => {
      mockRepository.getFolderById.mockResolvedValue(mockFolder);

      const result = await service.getFolderById('folder-1', 'user-1');

      expect(result).toEqual(mockFolder);
      expect(repository.getFolderById).toHaveBeenCalledWith('folder-1');
    });

    it('should throw FOLDER_NOT_FOUND when folder does not exist', async () => {
      mockRepository.getFolderById.mockResolvedValue(null);

      await expect(
        service.getFolderById('non-existent', 'user-1')
      ).rejects.toThrow(new FoldersException(FoldersError.FOLDER_NOT_FOUND));
    });

    it('should throw FORBIDDEN when user is not the owner', async () => {
      const otherUserFolder = { ...mockFolder, owner_id: 'user-2' };
      mockRepository.getFolderById.mockResolvedValue(otherUserFolder);

      await expect(service.getFolderById('folder-1', 'user-1')).rejects.toThrow(
        new FoldersException(FoldersError.FORBIDDEN)
      );
    });
  });

  describe('getUserFolders', () => {
    it('should return all folders for a user', async () => {
      const mockFolders = [mockFolder, { ...mockFolder, id: 'folder-2' }];
      mockRepository.getUserFolders.mockResolvedValue(mockFolders);

      const result = await service.getUserFolders('user-1');

      expect(result).toEqual(mockFolders);
      expect(repository.getUserFolders).toHaveBeenCalledWith('user-1', undefined);
    });

    it('should return empty array when user has no folders', async () => {
      mockRepository.getUserFolders.mockResolvedValue([]);

      const result = await service.getUserFolders('user-1');

      expect(result).toEqual([]);
    });
  });

  describe('createFolder', () => {
    it('should create a folder with generated URLs', async () => {
      const createData = {
        title: 'New Folder',
        description: 'Description',
      };
      mockRepository.createFolder.mockResolvedValue(mockFolder);

      const result = await service.createFolder(createData, 'user-1');

      expect(result).toEqual(mockFolder);
      expect(repository.createFolder).toHaveBeenCalledWith({
        title: 'New Folder',
        description: 'Description',
        password: undefined,
        upload_url: 'mocked-uuid',
        download_url: 'mocked-uuid',
        owner: { connect: { id: 'user-1' } },
      });
    });

    it('should create folder with password', async () => {
      const createData = {
        title: 'Secure Folder',
        password: 'secret123',
      };
      mockRepository.createFolder.mockResolvedValue({
        ...mockFolder,
        password: 'secret123',
      });

      const result = await service.createFolder(createData, 'user-1');

      expect(repository.createFolder).toHaveBeenCalledWith({
        title: 'Secure Folder',
        description: undefined,
        password: 'secret123',
        upload_url: 'mocked-uuid',
        download_url: 'mocked-uuid',
        owner: { connect: { id: 'user-1' } },
      });
      expect(result.password).toBe('secret123');
    });

    it('should create folder without description', async () => {
      const createData = {
        title: 'Simple Folder',
      };
      mockRepository.createFolder.mockResolvedValue(mockFolder);

      await service.createFolder(createData, 'user-1');

      expect(repository.createFolder).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Simple Folder',
          description: undefined,
          password: undefined,
          upload_url: 'mocked-uuid',
          download_url: 'mocked-uuid',
          owner: { connect: { id: 'user-1' } },
        })
      );
    });
  });

  describe('updateFolder', () => {
    it('should update folder when user is owner', async () => {
      mockRepository.getFolderById.mockResolvedValue(mockFolder);
      const updatedFolder = { ...mockFolder, title: 'Updated Title' };
      mockRepository.updateFolder.mockResolvedValue(updatedFolder);

      const result = await service.updateFolder('folder-1', 'user-1', {
        title: 'Updated Title',
      });

      expect(result).toEqual(updatedFolder);
      expect(repository.getFolderById).toHaveBeenCalledWith('folder-1');
      expect(repository.updateFolder).toHaveBeenCalledWith({
        where: { id: 'folder-1' },
        data: { title: 'Updated Title' },
      });
    });

    it('should throw FOLDER_NOT_FOUND when folder does not exist', async () => {
      mockRepository.getFolderById.mockResolvedValue(null);

      await expect(
        service.updateFolder('non-existent', 'user-1', { title: 'Updated' })
      ).rejects.toThrow(new FoldersException(FoldersError.FOLDER_NOT_FOUND));

      expect(repository.updateFolder).not.toHaveBeenCalled();
    });

    it('should throw FORBIDDEN when user is not owner', async () => {
      const otherUserFolder = { ...mockFolder, owner_id: 'user-2' };
      mockRepository.getFolderById.mockResolvedValue(otherUserFolder);

      await expect(
        service.updateFolder('folder-1', 'user-1', { title: 'Updated' })
      ).rejects.toThrow(new FoldersException(FoldersError.FORBIDDEN));

      expect(repository.updateFolder).not.toHaveBeenCalled();
    });
  });

  describe('refreshFolderLinks', () => {
    it('should generate new upload and download URLs', async () => {
      mockRepository.getFolderById.mockResolvedValue(mockFolder);
      const updatedFolder = {
        ...mockFolder,
        upload_url: 'mocked-uuid',
        download_url: 'mocked-uuid',
      };
      mockRepository.updateFolder.mockResolvedValue(updatedFolder);

      const result = await service.refreshFolderLinks('user-1', 'folder-1');

      expect(result).toEqual(updatedFolder);
      expect(repository.getFolderById).toHaveBeenCalledWith('folder-1');
      expect(repository.updateFolder).toHaveBeenCalledWith({
        where: { id: 'folder-1' },
        data: {
          upload_url: 'mocked-uuid',
          download_url: 'mocked-uuid',
        },
      });
    });

    it('should throw FOLDER_NOT_FOUND when folder does not exist', async () => {
      mockRepository.getFolderById.mockResolvedValue(null);

      await expect(
        service.refreshFolderLinks('user-1', 'non-existent')
      ).rejects.toThrow(new FoldersException(FoldersError.FOLDER_NOT_FOUND));

      expect(repository.updateFolder).not.toHaveBeenCalled();
    });

    it('should throw FORBIDDEN when user is not owner', async () => {
      const otherUserFolder = { ...mockFolder, owner_id: 'user-2' };
      mockRepository.getFolderById.mockResolvedValue(otherUserFolder);

      await expect(
        service.refreshFolderLinks('user-1', 'folder-1')
      ).rejects.toThrow(new FoldersException(FoldersError.FORBIDDEN));

      expect(repository.updateFolder).not.toHaveBeenCalled();
    });
  });

  describe('deleteFolder', () => {
    it('should delete folder when user is owner', async () => {
      mockRepository.getFolderById.mockResolvedValue(mockFolder);
      mockRepository.deleteFolder.mockResolvedValue(mockFolder);

      const result = await service.deleteFolder('folder-1', 'user-1');

      expect(result).toEqual(mockFolder);
      expect(repository.getFolderById).toHaveBeenCalledWith('folder-1');
      expect(repository.deleteFolder).toHaveBeenCalledWith({ id: 'folder-1' });
    });

    it('should throw FOLDER_NOT_FOUND when folder does not exist', async () => {
      mockRepository.getFolderById.mockResolvedValue(null);

      await expect(
        service.deleteFolder('non-existent', 'user-1')
      ).rejects.toThrow(new FoldersException(FoldersError.FOLDER_NOT_FOUND));

      expect(repository.deleteFolder).not.toHaveBeenCalled();
    });

    it('should throw FORBIDDEN when user is not owner', async () => {
      const otherUserFolder = { ...mockFolder, owner_id: 'user-2' };
      mockRepository.getFolderById.mockResolvedValue(otherUserFolder);

      await expect(service.deleteFolder('folder-1', 'user-1')).rejects.toThrow(
        new FoldersException(FoldersError.FORBIDDEN)
      );

      expect(repository.deleteFolder).not.toHaveBeenCalled();
    });
  });

  describe('checkFolderOwnership (private method tests via public methods)', () => {
    it('should validate ownership across all protected operations', async () => {
      const otherUserFolder = { ...mockFolder, owner_id: 'user-2' };
      mockRepository.getFolderById.mockResolvedValue(otherUserFolder);

      // Test that all methods that check ownership fail appropriately
      const operations = [
        () => service.getFolderById('folder-1', 'user-1'),
        () =>
          service.updateFolder('folder-1', 'user-1', { title: 'New Title' }),
        () => service.refreshFolderLinks('user-1', 'folder-1'),
        () => service.deleteFolder('folder-1', 'user-1'),
      ];

      for (const operation of operations) {
        await expect(operation()).rejects.toThrow(
          new FoldersException(FoldersError.FORBIDDEN)
        );
      }
    });
  });

  describe('FoldersException', () => {
    it('should create exception with correct error type', () => {
      const exception = new FoldersException(FoldersError.FOLDER_NOT_FOUND);

      expect(exception).toBeInstanceOf(Error);
      expect(exception.type).toBe(FoldersError.FOLDER_NOT_FOUND);
      expect(exception.message).toBe(FoldersError.FOLDER_NOT_FOUND);
    });

    it('should create FORBIDDEN exception', () => {
      const exception = new FoldersException(FoldersError.FORBIDDEN);

      expect(exception.type).toBe(FoldersError.FORBIDDEN);
      expect(exception.message).toBe(FoldersError.FORBIDDEN);
    });
  });
});
