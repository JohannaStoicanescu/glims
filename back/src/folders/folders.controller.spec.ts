import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { FoldersController } from './folders.controller';
import { FoldersService } from './folders.service';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { Folder } from '@prisma/client';
import { UserSession, AuthGuard } from '@thallesp/nestjs-better-auth';

vi.mock('better-auth', () => ({
  uuidv4: vi.fn(() => ({
    format: 'mocked-uuid',
  })),
}));

describe('FoldersController', () => {
  let controller: FoldersController;
  let service: FoldersService;

  const mockFoldersService = {
    getFolderById: vi.fn(),
    getUserFolders: vi.fn(),
    createFolder: vi.fn(),
    updateFolder: vi.fn(),
    deleteFolder: vi.fn(),
  };

  const mockSession: UserSession = {
    session: {
      id: 'session-1',
      userId: 'user-1',
      token: 'token',
      expiresAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ipAddress: '',
      userAgent: '',
    },
    user: {
      id: 'user-1',
      email: 'test@example.com',
      name: 'Test User',
      emailVerified: false,
      image: null,
      createdAt: new Date(),
      updatedAt: new Date(),
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
      controllers: [FoldersController],
      providers: [
        {
          provide: FoldersService,
          useValue: mockFoldersService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<FoldersController>(FoldersController);
    service = module.get<FoldersService>(FoldersService);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('getFolderById', () => {
    it('should return folder when user is the owner', async () => {
      mockFoldersService.getFolderById.mockResolvedValue(mockFolder);

      const result = await controller.getFolderById(mockSession, 'folder-1');

      expect(result).toEqual(mockFolder);
      expect(service.getFolderById).toHaveBeenCalledWith('folder-1');
    });

    it('should throw NotFoundException when folder does not exist', async () => {
      mockFoldersService.getFolderById.mockResolvedValue(null);

      await expect(
        controller.getFolderById(mockSession, 'non-existent')
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw ForbiddenException when user is not the owner', async () => {
      const otherUserFolder = { ...mockFolder, owner_id: 'user-2' };
      mockFoldersService.getFolderById.mockResolvedValue(otherUserFolder);

      await expect(
        controller.getFolderById(mockSession, 'folder-1')
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('getUserFolders', () => {
    it('should return all folders for the authenticated user', async () => {
      const mockFolders = [mockFolder, { ...mockFolder, id: 'folder-2' }];
      mockFoldersService.getUserFolders.mockResolvedValue(mockFolders);

      const result = await controller.getUserFolders(mockSession);

      expect(result).toEqual(mockFolders);
      expect(service.getUserFolders).toHaveBeenCalledWith('user-1');
    });
  });

  describe('createFolder', () => {
    it('should create a new folder with generated URLs', async () => {
      const body = { title: 'New Folder', description: 'Description' };
      mockFoldersService.createFolder.mockResolvedValue(mockFolder);

      const result = await controller.createFolder(mockSession, body);

      expect(result).toEqual(mockFolder);
      expect(service.createFolder).toHaveBeenCalledWith({
        ...body,
        upload_url: 'mocked-uuid',
        download_url: 'mocked-uuid',
        owner: { connect: { id: 'user-1' } },
      });
    });

    it('should create folder with password', async () => {
      const body = { title: 'Secure Folder', password: 'secret123' };
      mockFoldersService.createFolder.mockResolvedValue({
        ...mockFolder,
        password: 'secret123',
      });

      await controller.createFolder(mockSession, body);

      expect(service.createFolder).toHaveBeenCalledWith(
        expect.objectContaining({
          password: 'secret123',
        })
      );
    });
  });

  describe('updateFolder', () => {
    it('should update folder when user is owner', async () => {
      mockFoldersService.getFolderById.mockResolvedValue(mockFolder);
      const updatedFolder = { ...mockFolder, title: 'Updated Title' };
      mockFoldersService.updateFolder.mockResolvedValue(updatedFolder);

      const result = await controller.updateFolder(mockSession, 'folder-1', {
        title: 'Updated Title',
      });

      expect(result).toEqual(updatedFolder);
      expect(service.updateFolder).toHaveBeenCalledWith({
        where: { id: 'folder-1' },
        data: { title: 'Updated Title' },
      });
    });

    it('should throw when user is not owner', async () => {
      const otherUserFolder = { ...mockFolder, owner_id: 'user-2' };
      mockFoldersService.getFolderById.mockResolvedValue(otherUserFolder);

      await expect(
        controller.updateFolder(mockSession, 'folder-1', { title: 'Updated' })
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('removeFolderPassword', () => {
    it('should remove password when user is owner', async () => {
      mockFoldersService.getFolderById.mockResolvedValue(mockFolder);
      mockFoldersService.updateFolder.mockResolvedValue(mockFolder);

      const result = await controller.removeFolderPassword(
        mockSession,
        'folder-1'
      );

      expect(result).toEqual(mockFolder);
      expect(service.updateFolder).toHaveBeenCalledWith({
        where: { id: 'folder-1' },
        data: { password: null },
      });
    });

    it('should throw when user is not owner', async () => {
      const otherUserFolder = { ...mockFolder, owner_id: 'user-2' };
      mockFoldersService.getFolderById.mockResolvedValue(otherUserFolder);

      await expect(
        controller.removeFolderPassword(mockSession, 'folder-1')
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('refreshFolderLinks', () => {
    it('should generate new upload and download URLs', async () => {
      mockFoldersService.getFolderById.mockResolvedValue(mockFolder);
      mockFoldersService.updateFolder.mockResolvedValue(mockFolder);

      const result = await controller.refreshFolderLinks(
        mockSession,
        'folder-1'
      );

      expect(result).toEqual(mockFolder);
      expect(service.updateFolder).toHaveBeenCalledWith({
        where: { id: 'folder-1' },
        data: {
          upload_url: 'mocked-uuid',
          download_url: 'mocked-uuid',
        },
      });
    });

    it('should throw when user is not owner', async () => {
      const otherUserFolder = { ...mockFolder, owner_id: 'user-2' };
      mockFoldersService.getFolderById.mockResolvedValue(otherUserFolder);

      await expect(
        controller.refreshFolderLinks(mockSession, 'folder-1')
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('deleteFolder', () => {
    it('should delete folder when user is owner', async () => {
      mockFoldersService.getFolderById.mockResolvedValue(mockFolder);
      mockFoldersService.deleteFolder.mockResolvedValue(mockFolder);

      const result = await controller.deleteFolder(mockSession, 'folder-1');

      expect(result).toEqual(mockFolder);
      expect(service.deleteFolder).toHaveBeenCalledWith({ id: 'folder-1' });
    });

    it('should throw when folder does not exist', async () => {
      mockFoldersService.getFolderById.mockResolvedValue(null);

      await expect(
        controller.deleteFolder(mockSession, 'folder-1')
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw when user is not owner', async () => {
      const otherUserFolder = { ...mockFolder, owner_id: 'user-2' };
      mockFoldersService.getFolderById.mockResolvedValue(otherUserFolder);

      await expect(
        controller.deleteFolder(mockSession, 'folder-1')
      ).rejects.toThrow(ForbiddenException);
    });
  });
});
