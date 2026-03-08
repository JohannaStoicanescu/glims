/* eslint-disable @typescript-eslint/no-explicit-any */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { TagsService } from './tags.service';
import { TagsRepository } from './tags.repository';
import { FoldersRepository } from '../folders/folders.repository';
import type { Tag, Folder } from '@prisma/client';

describe('TagsService', () => {
  let service: TagsService;
  let tagsRepository: TagsRepository;
  let foldersRepository: FoldersRepository;

  const mockTagsRepository = {
    getAllTags: vi.fn(),
    prepareTagsConnect: vi.fn(),
    getTagsFromFolders: vi.fn(),
  };

  const mockFoldersRepository = {
    getAccessibleFolders: vi.fn(),
  };

  const mockTag: Tag = {
    id: 'tag-1',
    name: 'Test Tag',
    created_at: new Date(),
    updated_at: new Date(),
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
    tagsRepository = mockTagsRepository as any;
    foldersRepository = mockFoldersRepository as any;
    service = new TagsService(tagsRepository, foldersRepository);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('getAllTags', () => {
    it('should return all tags', async () => {
      const mockTags = [
        mockTag,
        { ...mockTag, id: 'tag-2', name: 'Another Tag' },
      ];
      mockTagsRepository.getAllTags.mockResolvedValue(mockTags);

      const result = await service.getAllTags();

      expect(result).toEqual(mockTags);
      expect(tagsRepository.getAllTags).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when no tags exist', async () => {
      mockTagsRepository.getAllTags.mockResolvedValue([]);

      const result = await service.getAllTags();

      expect(result).toEqual([]);
      expect(tagsRepository.getAllTags).toHaveBeenCalledTimes(1);
    });
  });

  describe('prepareTagsConnect', () => {
    it('should prepare tags connect input', async () => {
      const tagNames = ['tag1', 'tag2'];
      const mockConnect = {
        connect: [{ name: 'tag1' }, { name: 'tag2' }],
      };
      mockTagsRepository.prepareTagsConnect.mockResolvedValue(mockConnect);

      const result = await service.prepareTagsConnect(tagNames);

      expect(result).toEqual(mockConnect);
      expect(tagsRepository.prepareTagsConnect).toHaveBeenCalledWith(tagNames);
    });

    it('should handle empty tag names array', async () => {
      const mockConnect = { connect: [] };
      mockTagsRepository.prepareTagsConnect.mockResolvedValue(mockConnect);

      const result = await service.prepareTagsConnect([]);

      expect(result).toEqual(mockConnect);
      expect(tagsRepository.prepareTagsConnect).toHaveBeenCalledWith([]);
    });
  });

  describe('getAvailableTags', () => {
    it('should return tags from accessible folders', async () => {
      const mockFolders = [mockFolder, { ...mockFolder, id: 'folder-2' }];
      const mockTags = [
        mockTag,
        { ...mockTag, id: 'tag-2', name: 'Another Tag' },
      ];

      mockFoldersRepository.getAccessibleFolders.mockResolvedValue(mockFolders);
      mockTagsRepository.getTagsFromFolders.mockResolvedValue(mockTags);

      const result = await service.getAvailableTags('user-1');

      expect(result).toEqual(mockTags);
      expect(foldersRepository.getAccessibleFolders).toHaveBeenCalledWith(
        'user-1'
      );
      expect(tagsRepository.getTagsFromFolders).toHaveBeenCalledWith([
        'folder-1',
        'folder-2',
      ]);
    });

    it('should return empty array when user has no accessible folders', async () => {
      mockFoldersRepository.getAccessibleFolders.mockResolvedValue([]);
      mockTagsRepository.getTagsFromFolders.mockResolvedValue([]);

      const result = await service.getAvailableTags('user-1');

      expect(result).toEqual([]);
      expect(foldersRepository.getAccessibleFolders).toHaveBeenCalledWith(
        'user-1'
      );
      expect(tagsRepository.getTagsFromFolders).toHaveBeenCalledWith([]);
    });
  });
});
