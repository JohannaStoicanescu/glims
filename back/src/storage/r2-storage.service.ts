import { Injectable } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';
import { S3StorageService } from './s3-storage.service';

@Injectable()
export class R2StorageService extends S3StorageService {
  constructor() {
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
      throw new Error('R2_SECRET_ACCESS_KEY environment variable is required');
    }
    if (!bucketName) {
      throw new Error('R2_BUCKET_NAME environment variable is required');
    }

    // R2 endpoint format: https://<account-id>.r2.cloudflarestorage.com
    const endpoint = `https://${accountId}.r2.cloudflarestorage.com`;

    const s3Client = new S3Client({
      endpoint: endpoint,
      region: 'auto', // R2 uses 'auto' as the region
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      },
      // R2 uses virtual-hosted style, not path style
      forcePathStyle: false,
    });

    super(s3Client, bucketName);
    this.logger.log(`Initialized R2 storage: ${bucketName}`);
  }
}
