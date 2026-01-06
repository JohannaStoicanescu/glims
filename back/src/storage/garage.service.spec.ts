/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { GarageStorageService } from './garage.service';
import { Readable } from 'stream';

// Create a shared mock send function
const mockSend = vi.fn();

// Mock AWS SDK
vi.mock('@aws-sdk/client-s3', () => {
  return {
    S3Client: class {
      send = mockSend;
      constructor() {
        // Constructor does nothing, send is already set
      }
    },
    PutObjectCommand: vi.fn(),
    GetObjectCommand: vi.fn(),
    DeleteObjectCommand: vi.fn(),
    ListObjectsV2Command: vi.fn(),
    HeadObjectCommand: vi.fn(),
  };
});

// Create mock for getSignedUrl using vi.hoisted to make it accessible
const mockGetSignedUrl = vi.hoisted(() => {
  return vi.fn(() => Promise.resolve('https://presigned-url.example.com'));
});

vi.mock('@aws-sdk/s3-request-presigner', () => {
  return {
    getSignedUrl: mockGetSignedUrl,
  };
});

describe('GarageStorageService', () => {
  let service: GarageStorageService;
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    // Save original env
    originalEnv = { ...process.env };

    // Set required environment variables
    process.env.GARAGE_ENDPOINT = 'http://localhost:3900';
    process.env.GARAGE_ACCESS_KEY = 'test-access-key';
    process.env.GARAGE_SECRET_KEY = 'test-secret-key';
    process.env.GARAGE_BUCKET_NAME = 'test-bucket';
    process.env.GARAGE_REGION = 'garage';

    service = new GarageStorageService();
  });

  afterEach(() => {
    vi.clearAllMocks();
    mockGetSignedUrl.mockClear();
    // Restore original env
    process.env = originalEnv;
  });

  describe('constructor', () => {
    it('should initialize with valid environment variables', () => {
      expect(service).toBeInstanceOf(GarageStorageService);
    });

    it('should throw error when GARAGE_ENDPOINT is missing', () => {
      delete process.env.GARAGE_ENDPOINT;

      expect(() => new GarageStorageService()).toThrow(
        'GARAGE_ENDPOINT environment variable is required'
      );
    });

    it('should throw error when GARAGE_ACCESS_KEY is missing', () => {
      delete process.env.GARAGE_ACCESS_KEY;

      expect(() => new GarageStorageService()).toThrow(
        'GARAGE_ACCESS_KEY environment variable is required'
      );
    });

    it('should throw error when GARAGE_SECRET_KEY is missing', () => {
      delete process.env.GARAGE_SECRET_KEY;

      expect(() => new GarageStorageService()).toThrow(
        'GARAGE_SECRET_KEY environment variable is required'
      );
    });

    it('should throw error when GARAGE_BUCKET_NAME is missing', () => {
      delete process.env.GARAGE_BUCKET_NAME;

      expect(() => new GarageStorageService()).toThrow(
        'GARAGE_BUCKET_NAME environment variable is required'
      );
    });
  });

  describe('uploadFile', () => {
    it('should upload file successfully', async () => {
      const fileBuffer = Buffer.from('test file content');
      mockSend.mockResolvedValue({});

      const result = await service.uploadFile('test-key', fileBuffer, 'image/jpeg');

      expect(result).toBe('test-key');
      expect(mockSend).toHaveBeenCalledTimes(1);
    });

    it('should upload file without contentType', async () => {
      const fileBuffer = Buffer.from('test file content');
      mockSend.mockResolvedValue({});

      const result = await service.uploadFile('test-key', fileBuffer);

      expect(result).toBe('test-key');
      expect(mockSend).toHaveBeenCalledTimes(1);
    });

    it('should throw error on upload failure', async () => {
      const fileBuffer = Buffer.from('test file content');
      const error = new Error('Upload failed');
      mockSend.mockRejectedValue(error);

      await expect(
        service.uploadFile('test-key', fileBuffer)
      ).rejects.toThrow('Upload failed');
    });
  });

  describe('downloadFile', () => {
    it('should download file successfully', async () => {
      const fileContent = Buffer.from('test file content');
      const mockStream = Readable.from([fileContent]);
      mockSend.mockResolvedValue({ Body: mockStream });

      const result = await service.downloadFile('test-key');

      expect(result).toEqual(fileContent);
      expect(mockSend).toHaveBeenCalledTimes(1);
    });

    it('should handle stream chunks correctly', async () => {
      const chunk1 = Buffer.from('chunk1');
      const chunk2 = Buffer.from('chunk2');
      const mockStream = Readable.from([chunk1, chunk2]);
      mockSend.mockResolvedValue({ Body: mockStream });

      const result = await service.downloadFile('test-key');

      expect(result).toEqual(Buffer.concat([chunk1, chunk2]));
    });

    it('should throw error on download failure', async () => {
      const error = new Error('Download failed');
      mockSend.mockRejectedValue(error);

      await expect(service.downloadFile('test-key')).rejects.toThrow(
        'Download failed'
      );
    });

    it('should handle stream errors', async () => {
      const mockStream = Readable.from([]);
      mockSend.mockResolvedValue({ Body: mockStream });

      const downloadPromise = service.downloadFile('test-key');

      // Simulate stream error immediately
      process.nextTick(() => {
        mockStream.emit('error', new Error('Stream error'));
      });

      await expect(downloadPromise).rejects.toThrow('Stream error');
    });
  });

  describe('getFileStream', () => {
    it('should return file stream', async () => {
      const mockStream = Readable.from(['test']);
      mockSend.mockResolvedValue({ Body: mockStream });

      const result = await service.getFileStream('test-key');

      expect(result).toBe(mockStream);
      expect(mockSend).toHaveBeenCalledTimes(1);
    });

    it('should throw error on stream failure', async () => {
      const error = new Error('Stream failed');
      mockSend.mockRejectedValue(error);

      await expect(service.getFileStream('test-key')).rejects.toThrow(
        'Stream failed'
      );
    });
  });

  describe('deleteFile', () => {
    it('should delete file successfully', async () => {
      mockSend.mockResolvedValue({});

      await service.deleteFile('test-key');

      expect(mockSend).toHaveBeenCalledTimes(1);
    });

    it('should throw error on delete failure', async () => {
      const error = new Error('Delete failed');
      mockSend.mockRejectedValue(error);

      await expect(service.deleteFile('test-key')).rejects.toThrow(
        'Delete failed'
      );
    });
  });

  describe('listFiles', () => {
    it('should list files successfully', async () => {
      const mockResponse = {
        Contents: [
          { Key: 'file1.jpg' },
          { Key: 'file2.jpg' },
          { Key: 'file3.jpg' },
        ],
      };
      mockSend.mockResolvedValue(mockResponse);

      const result = await service.listFiles();

      expect(result).toEqual(['file1.jpg', 'file2.jpg', 'file3.jpg']);
      expect(mockSend).toHaveBeenCalledTimes(1);
    });

    it('should list files with prefix', async () => {
      const mockResponse = {
        Contents: [{ Key: 'prefix/file1.jpg' }],
      };
      mockSend.mockResolvedValue(mockResponse);

      const result = await service.listFiles('prefix/');

      expect(result).toEqual(['prefix/file1.jpg']);
    });

    it('should list files with maxKeys', async () => {
      const mockResponse = {
        Contents: [{ Key: 'file1.jpg' }],
      };
      mockSend.mockResolvedValue(mockResponse);

      const result = await service.listFiles(undefined, 10);

      expect(result).toEqual(['file1.jpg']);
    });

    it('should return empty array when no files found', async () => {
      mockSend.mockResolvedValue({ Contents: undefined });

      const result = await service.listFiles();

      expect(result).toEqual([]);
    });

    it('should throw error on list failure', async () => {
      const error = new Error('List failed');
      mockSend.mockRejectedValue(error);

      await expect(service.listFiles()).rejects.toThrow('List failed');
    });
  });

  describe('fileExists', () => {
    it('should return true when file exists', async () => {
      mockSend.mockResolvedValue({});

      const result = await service.fileExists('test-key');

      expect(result).toBe(true);
      expect(mockSend).toHaveBeenCalledTimes(1);
    });

    it('should return false when file does not exist', async () => {
      const error = new Error('Not found');
      (error as any).name = 'NotFound';
      mockSend.mockRejectedValue(error);

      const result = await service.fileExists('test-key');

      expect(result).toBe(false);
    });

    it('should throw error on other errors', async () => {
      const error = new Error('Other error');
      mockSend.mockRejectedValue(error);

      await expect(service.fileExists('test-key')).rejects.toThrow('Other error');
    });
  });

  describe('getPresignedUrl', () => {
    it('should generate presigned URL', async () => {
      mockGetSignedUrl.mockResolvedValue('https://presigned-url.example.com');

      const result = await service.getPresignedUrl('test-key');

      expect(result).toBe('https://presigned-url.example.com');
      expect(mockGetSignedUrl).toHaveBeenCalledTimes(1);
    });

    it('should generate presigned URL with custom expiration', async () => {
      mockGetSignedUrl.mockResolvedValue('https://presigned-url.example.com');

      const result = await service.getPresignedUrl('test-key', 7200);

      expect(result).toBe('https://presigned-url.example.com');
      expect(mockGetSignedUrl).toHaveBeenCalledWith(
        expect.any(Object),
        expect.any(Object),
        { expiresIn: 7200 }
      );
    });

    it('should throw error on presigned URL generation failure', async () => {
      const error = new Error('Presigned URL failed');
      mockGetSignedUrl.mockRejectedValue(error);

      await expect(service.getPresignedUrl('test-key')).rejects.toThrow(
        'Presigned URL failed'
      );
    });
  });
});

