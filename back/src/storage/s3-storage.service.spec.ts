/* eslint-disable @typescript-eslint/no-explicit-any */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { S3StorageService } from './s3-storage.service';
import { GarageStorageService } from './garage-storage.service';
import { R2StorageService } from './r2-storage.service';
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

describe('S3StorageService', () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalEnv = { ...process.env };
  });

  afterEach(() => {
    vi.clearAllMocks();
    mockGetSignedUrl.mockClear();
    process.env = originalEnv;
  });

  describe('GarageStorageService', () => {
    beforeEach(() => {
      process.env.GARAGE_ENDPOINT = 'http://localhost:3900';
      process.env.GARAGE_ACCESS_KEY = 'test-access-key';
      process.env.GARAGE_SECRET_KEY = 'test-secret-key';
      process.env.GARAGE_BUCKET_NAME = 'test-bucket';
      process.env.GARAGE_REGION = 'garage';
    });

    it('should initialize with valid Garage environment variables', () => {
      const service = new GarageStorageService();
      expect(service).toBeInstanceOf(S3StorageService);
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

    it('should upload file successfully', async () => {
      const service = new GarageStorageService();
      const fileBuffer = Buffer.from('test file content');
      mockSend.mockResolvedValue({});

      const result = await service.uploadFile(
        'test-key',
        fileBuffer,
        'image/jpeg'
      );

      expect(result).toBe('test-key');
      expect(mockSend).toHaveBeenCalledTimes(1);
    });
  });

  describe('R2StorageService', () => {
    beforeEach(() => {
      process.env.R2_ACCOUNT_ID = 'test-account-id';
      process.env.R2_ACCESS_KEY_ID = 'test-access-key-id';
      process.env.R2_SECRET_ACCESS_KEY = 'test-secret-access-key';
      process.env.R2_BUCKET_NAME = 'test-bucket';
    });

    it('should initialize with valid R2 environment variables', () => {
      const service = new R2StorageService();
      expect(service).toBeInstanceOf(S3StorageService);
    });

    it('should throw error when R2_ACCOUNT_ID is missing', () => {
      delete process.env.R2_ACCOUNT_ID;

      expect(() => new R2StorageService()).toThrow(
        'R2_ACCOUNT_ID environment variable is required'
      );
    });

    it('should throw error when R2_ACCESS_KEY_ID is missing', () => {
      delete process.env.R2_ACCESS_KEY_ID;

      expect(() => new R2StorageService()).toThrow(
        'R2_ACCESS_KEY_ID environment variable is required'
      );
    });

    it('should throw error when R2_SECRET_ACCESS_KEY is missing', () => {
      delete process.env.R2_SECRET_ACCESS_KEY;

      expect(() => new R2StorageService()).toThrow(
        'R2_SECRET_ACCESS_KEY environment variable is required'
      );
    });

    it('should throw error when R2_BUCKET_NAME is missing', () => {
      delete process.env.R2_BUCKET_NAME;

      expect(() => new R2StorageService()).toThrow(
        'R2_BUCKET_NAME environment variable is required'
      );
    });

    it('should upload file successfully', async () => {
      const service = new R2StorageService();
      const fileBuffer = Buffer.from('test file content');
      mockSend.mockResolvedValue({});

      const result = await service.uploadFile(
        'test-key',
        fileBuffer,
        'image/jpeg'
      );

      expect(result).toBe('test-key');
      expect(mockSend).toHaveBeenCalledTimes(1);
    });
  });

  describe('Common functionality', () => {
    let service: S3StorageService;

    beforeEach(() => {
      process.env.GARAGE_ENDPOINT = 'http://localhost:3900';
      process.env.GARAGE_ACCESS_KEY = 'test-access-key';
      process.env.GARAGE_SECRET_KEY = 'test-secret-key';
      process.env.GARAGE_BUCKET_NAME = 'test-bucket';
      service = new GarageStorageService();
    });

    it('should download file successfully', async () => {
      const fileContent = Buffer.from('test file content');
      const mockStream = Readable.from([fileContent]);
      mockSend.mockResolvedValue({ Body: mockStream });

      const result = await service.downloadFile('test-key');

      expect(result).toEqual(fileContent);
      expect(mockSend).toHaveBeenCalledTimes(1);
    });

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

    it('should check if file exists', async () => {
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

    it('should generate presigned URL', async () => {
      mockGetSignedUrl.mockResolvedValue('https://presigned-url.example.com');

      const result = await service.getPresignedUrl('test-key');

      expect(result).toBe('https://presigned-url.example.com');
      expect(mockGetSignedUrl).toHaveBeenCalledTimes(1);
    });
  });
});
