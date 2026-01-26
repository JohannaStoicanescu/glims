import { Injectable, Logger } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
  HeadObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Readable } from 'stream';
import { StorageService } from './storage.interface';

type StorageProvider = 'garage' | 'R2';

@Injectable()
export class S3StorageService implements StorageService {
  private readonly logger = new Logger(S3StorageService.name);
  private readonly s3Client: S3Client;
  private readonly bucketName: string;
  private readonly provider: StorageProvider;

  constructor() {
    // Determine which storage provider to use
    const storageProviderEnv = (process.env.STORAGE_PROVIDER || 'garage')
      .toLowerCase();
    
    let storageProvider: StorageProvider;
    if (storageProviderEnv === 'r2') {
      storageProvider = 'R2';
    } else if (storageProviderEnv === 'garage') {
      storageProvider = 'garage';
    } else {
      throw new Error(
        `Invalid STORAGE_PROVIDER: ${process.env.STORAGE_PROVIDER}. Must be 'garage' or 'R2'`
      );
    }

    this.provider = storageProvider;

    if (storageProvider === 'R2') {
      // R2 Configuration
      const accountId = process.env.R2_ACCOUNT_ID;
      const accessKeyId = process.env.R2_ACCESS_KEY_ID;
      const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
      const bucketName = process.env.R2_BUCKET_NAME;

      if (!accountId) {
        throw new Error('R2_ACCOUNT_ID environment variable is required');
      }
      if (!accessKeyId) {
        throw new Error('R2_ACCESS_KEY_ID environment variable is required');
      }
      if (!secretAccessKey) {
        throw new Error(
          'R2_SECRET_ACCESS_KEY environment variable is required'
        );
      }
      if (!bucketName) {
        throw new Error('R2_BUCKET_NAME environment variable is required');
      }

      this.bucketName = bucketName;

      // R2 endpoint format: https://<account-id>.r2.cloudflarestorage.com
      const endpoint = `https://${accountId}.r2.cloudflarestorage.com`;

      this.s3Client = new S3Client({
        endpoint: endpoint,
        region: 'auto', // R2 uses 'auto' as the region
        credentials: {
          accessKeyId: accessKeyId,
          secretAccessKey: secretAccessKey,
        },
        // R2 uses virtual-hosted style, not path style
        forcePathStyle: false,
      });

      this.logger.log(`Initialized R2 storage: ${bucketName}`);
    } else {
      // Garage Configuration
      const region = process.env.GARAGE_REGION || 'garage';
      const endpoint = process.env.GARAGE_ENDPOINT;
      const accessKeyId = process.env.GARAGE_ACCESS_KEY;
      const secretAccessKey = process.env.GARAGE_SECRET_KEY;
      const bucketName = process.env.GARAGE_BUCKET_NAME;

      if (!endpoint) {
        throw new Error('GARAGE_ENDPOINT environment variable is required');
      }
      if (!accessKeyId) {
        throw new Error('GARAGE_ACCESS_KEY environment variable is required');
      }
      if (!secretAccessKey) {
        throw new Error('GARAGE_SECRET_KEY environment variable is required');
      }
      if (!bucketName) {
        throw new Error('GARAGE_BUCKET_NAME environment variable is required');
      }

      this.bucketName = bucketName;

      this.s3Client = new S3Client({
        endpoint: endpoint,
        region: region,
        credentials: {
          accessKeyId: accessKeyId,
          secretAccessKey: secretAccessKey,
        },
        // Garage requires path style
        forcePathStyle: true,
      });

      this.logger.log(`Initialized Garage storage: ${bucketName}`);
    }
  }

  async uploadFile(
    key: string,
    file: Buffer,
    contentType?: string
  ): Promise<string> {
    try {
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: file,
        ContentType: contentType,
      });

      await this.s3Client.send(command);
      this.logger.log(`File uploaded successfully: ${key}`);
      return key;
    } catch (error) {
      this.logger.error(`Error uploading file: ${error.message}`);
      throw error;
    }
  }

  async downloadFile(key: string): Promise<Buffer> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      const response = await this.s3Client.send(command);
      const stream = response.Body as Readable;

      return new Promise((resolve, reject) => {
        const chunks: Buffer[] = [];
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('error', reject);
        stream.on('end', () => resolve(Buffer.concat(chunks)));
      });
    } catch (error) {
      this.logger.error(`Error downloading file: ${error.message}`);
      throw error;
    }
  }

  async getFileStream(key: string): Promise<Readable> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      const response = await this.s3Client.send(command);
      return response.Body as Readable;
    } catch (error) {
      this.logger.error(`Error getting file stream: ${error.message}`);
      throw error;
    }
  }

  async deleteFile(key: string): Promise<void> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      await this.s3Client.send(command);
      this.logger.log(`File deleted successfully: ${key}`);
    } catch (error) {
      this.logger.error(`Error deleting file: ${error.message}`);
      throw error;
    }
  }

  async listFiles(prefix?: string, maxKeys: number = 1000): Promise<string[]> {
    try {
      const command = new ListObjectsV2Command({
        Bucket: this.bucketName,
        Prefix: prefix,
        MaxKeys: maxKeys,
      });

      const response = await this.s3Client.send(command);
      return response.Contents?.map((item) => item.Key) || [];
    } catch (error) {
      this.logger.error(`Error listing files: ${error.message}`);
      throw error;
    }
  }

  async fileExists(key: string): Promise<boolean> {
    try {
      const command = new HeadObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      await this.s3Client.send(command);
      return true;
    } catch (error) {
      if (error.name === 'NotFound') {
        return false;
      }
      throw error;
    }
  }

  async getPresignedUrl(
    key: string,
    expiresIn: number = 3600
  ): Promise<string> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      return await getSignedUrl(this.s3Client, command, { expiresIn });
    } catch (error) {
      this.logger.error(`Error generating presigned URL: ${error.message}`);
      throw error;
    }
  }
}
