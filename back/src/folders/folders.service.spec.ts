import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { FoldersService } from './folders.service';
import { PrismaService } from 'src/lib/prisma.service';
import { Folder } from '@prisma/client';

describe('FoldersService', () => {
  let service: FoldersService;
  let prisma: PrismaService;

  const mockPrismaService = {
    folder: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FoldersService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<FoldersService>(FoldersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('getFolderById', () => {
    it('should return a folder when found', async () => {
      mockPrismaService.folder.findUnique.mockResolvedValue(mockFolder);

      const result = await service.getFolderById('folder-1');

      expect(result).toEqual(mockFolder);
      expect(prisma.folder.findUnique).toHaveBeenCalledWith({
        where: { id: 'folder-1' },
      });
    });

    it('should return null when folder not found', async () => {
      mockPrismaService.folder.findUnique.mockResolvedValue(null);

      const result = await service.getFolderById('non-existent');

      expect(result).toBeNull();
    });
  });

  describe('getUserFolders', () => {
    it('should return all folders for a user', async () => {
      const mockFolders = [mockFolder, { ...mockFolder, id: 'folder-2' }];
      mockPrismaService.folder.findMany.mockResolvedValue(mockFolders);

      const result = await service.getUserFolders('user-1');

      expect(result).toEqual(mockFolders);
      expect(prisma.folder.findMany).toHaveBeenCalledWith({
        where: { owner_id: 'user-1' },
      });
    });

    it('should return empty array when user has no folders', async () => {
      mockPrismaService.folder.findMany.mockResolvedValue([]);

      const result = await service.getUserFolders('user-1');

      expect(result).toEqual([]);
    });
  });

  describe('createFolder', () => {
    it('should create and return a new folder', async () => {
      const createData = {
        title: 'New Folder',
        description: 'Description',
        upload_url: 'upload',
        download_url: 'download',
        owner: { connect: { id: 'user-1' } },
      };
      mockPrismaService.folder.create.mockResolvedValue(mockFolder);

      const result = await service.createFolder(createData);

      expect(result).toEqual(mockFolder);
      expect(prisma.folder.create).toHaveBeenCalledWith({ data: createData });
    });
  });

  describe('updateFolder', () => {
    it('should update and return the folder', async () => {
      const updateParams = {
        where: { id: 'folder-1' },
        data: { title: 'Updated Title' },
      };
      const updatedFolder = { ...mockFolder, title: 'Updated Title' };
      mockPrismaService.folder.update.mockResolvedValue(updatedFolder);

      const result = await service.updateFolder(updateParams);

      expect(result).toEqual(updatedFolder);
      expect(prisma.folder.update).toHaveBeenCalledWith(updateParams);
    });
  });

  describe('deleteFolder', () => {
    it('should delete and return the folder', async () => {
      mockPrismaService.folder.delete.mockResolvedValue(mockFolder);

      const result = await service.deleteFolder({ id: 'folder-1' });

      expect(result).toEqual(mockFolder);
      expect(prisma.folder.delete).toHaveBeenCalledWith({
        where: { id: 'folder-1' },
      });
    });
  });
});
