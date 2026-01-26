/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { S3StorageService } from './s3-storage.service';
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
  let service: S3StorageService;
  let originalEnv: NodeJS.ProcessEnv;

  describe('Garage configuration', () => {
    beforeEach(() => {
      // Save original env
      originalEnv = { ...process.env };

      // Set required environment variables for Garage
      process.env.STORAGE_PROVIDER = 'garage';
      process.env.GARAGE_ENDPOINT = 'http://localhost:3900';
      process.env.GARAGE_ACCESS_KEY = 'test-access-key';
      process.env.GARAGE_SECRET_KEY = 'test-secret-key';
      process.env.GARAGE_BUCKET_NAME = 'test-bucket';
      process.env.GARAGE_REGION = 'garage';

      service = new S3StorageService();
    });

    afterEach(() => {
      vi.clearAllMocks();
      mockGetSignedUrl.mockClear();
      // Restore original env
      process.env = originalEnv;
    });

    it('should initialize with valid Garage environment variables', () => {
      expect(service).toBeInstanceOf(S3StorageService);
    });

    it('should throw error when GARAGE_ENDPOINT is missing', () => {
      delete process.env.GARAGE_ENDPOINT;

      expect(() => new S3StorageService()).toThrow(
        'GARAGE_ENDPOINT environment variable is required'
      );
    });

    it('should throw error when GARAGE_ACCESS_KEY is missing', () => {
      delete process.env.GARAGE_ACCESS_KEY;

      expect(() => new S3StorageService()).toThrow(
        'GARAGE_ACCESS_KEY environment variable is required'
      );
    });

    it('should throw error when GARAGE_SECRET_KEY is missing', () => {
      delete process.env.GARAGE_SECRET_KEY;

      expect(() => new S3StorageService()).toThrow(
        'GARAGE_SECRET_KEY environment variable is required'
      );
    });

    it('should throw error when GARAGE_BUCKET_NAME is missing', () => {
      delete process.env.GARAGE_BUCKET_NAME;

      expect(() => new S3StorageService()).toThrow(
        'GARAGE_BUCKET_NAME environment variable is required'
      );
    });
  });

  describe('R2 configuration', () => {
    beforeEach(() => {
      // Save original env
      originalEnv = { ...process.env };

      // Set required environment variables for R2
      process.env.STORAGE_PROVIDER = 'R2';
      process.env.R2_ACCOUNT_ID = 'test-account-id';
      process.env.R2_ACCESS_KEY_ID = 'test-access-key-id';
      process.env.R2_SECRET_ACCESS_KEY = 'test-secret-access-key';
      process.env.R2_BUCKET_NAME = 'test-bucket';

      service = new S3StorageService();
    });

    afterEach(() => {
      vi.clearAllMocks();
      mockGetSignedUrl.mockClear();
      // Restore original env
      process.env = originalEnv;
    });

    it('should initialize with valid R2 environment variables', () => {
      expect(service).toBeInstanceOf(S3StorageService);
    });

    it('should throw error when R2_ACCOUNT_ID is missing', () => {
      delete process.env.R2_ACCOUNT_ID;

      expect(() => new S3StorageService()).toThrow(
        'R2_ACCOUNT_ID environment variable is required'
      );
    });

    it('should throw error when R2_ACCESS_KEY_ID is missing', () => {
      delete process.env.R2_ACCESS_KEY_ID;

      expect(() => new S3StorageService()).toThrow(
        'R2_ACCESS_KEY_ID environment variable is required'
      );
    });

    it('should throw error when R2_SECRET_ACCESS_KEY is missing', () => {
      delete process.env.R2_SECRET_ACCESS_KEY;

      expect(() => new S3StorageService()).toThrow(
        'R2_SECRET_ACCESS_KEY environment variable is required'
      );
    });

    it('should throw error when R2_BUCKET_NAME is missing', () => {
      delete process.env.R2_BUCKET_NAME;

      expect(() => new S3StorageService()).toThrow(
        'R2_BUCKET_NAME environment variable is required'
      );
    });
  });

  describe('Invalid provider', () => {
    beforeEach(() => {
      originalEnv = { ...process.env };
    });

    afterEach(() => {
      process.env = originalEnv;
    });

    it('should throw error for invalid storage provider', () => {
      process.env.STORAGE_PROVIDER = 'invalid';

      expect(() => new S3StorageService()).toThrow(
        "Invalid STORAGE_PROVIDER: invalid. Must be 'garage' or 'R2'"
      );
    });
  });

  describe('uploadFile', () => {
    beforeEach(() => {
      originalEnv = { ...process.env };
      process.env.STORAGE_PROVIDER = 'garage';
      process.env.GARAGE_ENDPOINT = 'http://localhost:3900';
      process.env.GARAGE_ACCESS_KEY = 'test-access-key';
      process.env.GARAGE_SECRET_KEY = 'test-secret-key';
      process.env.GARAGE_BUCKET_NAME = 'test-bucket';
      service = new S3StorageService();
    });

    afterEach(() => {
      vi.clearAllMocks();
      process.env = originalEnv;
    });

    it('should upload file successfully', async () => {
      const fileBuffer = Buffer.from('test file content');
      mockSend.mockResolvedValue({});

      const result = await service.uploadFile('test-key', fileBuffer, 'image/jpeg');

      expect(result).toBe('test-key');
      expect(mockSend).toHaveBeenCalledTimes(1);
    });
  });

  describe('downloadFile', () => {
    beforeEach(() => {
      originalEnv = { ...process.env };
      process.env.STORAGE_PROVIDER = 'garage';
      process.env.GARAGE_ENDPOINT = 'http://localhost:3900';
      process.env.GARAGE_ACCESS_KEY = 'test-access-key';
      process.env.GARAGE_SECRET_KEY = 'test-secret-key';
      process.env.GARAGE_BUCKET_NAME = 'test-bucket';
      service = new S3StorageService();
    });

    afterEach(() => {
      vi.clearAllMocks();
      process.env = originalEnv;
    });

    it('should download file successfully', async () => {
      const fileContent = Buffer.from('test file content');
      const mockStream = Readable.from([fileContent]);
      mockSend.mockResolvedValue({ Body: mockStream });

      const result = await service.downloadFile('test-key');

      expect(result).toEqual(fileContent);
      expect(mockSend).toHaveBeenCalledTimes(1);
    });
  });
});
