import { Injectable } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';
import { S3StorageService } from './s3-storage.service';

@Injectable()
export class GarageStorageService extends S3StorageService {
  constructor() {
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

    const s3Client = new S3Client({
      endpoint: endpoint,
      region: region,
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      },
      // Garage requires path style
      forcePathStyle: true,
    });

    super(s3Client, bucketName);
    this.logger.log(`Initialized Garage storage: ${bucketName}`);
  }
}
