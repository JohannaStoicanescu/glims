import { Provider } from '@nestjs/common';
import { S3StorageService } from './s3-storage.service';
import { GarageStorageService } from './garage-storage.service';
import { R2StorageService } from './r2-storage.service';

export const StorageServiceProvider: Provider<S3StorageService> = {
  provide: S3StorageService,
  useFactory: (): S3StorageService => {
    const storageProvider = (
      process.env.STORAGE_PROVIDER || 'garage'
    ).toLowerCase();

    if (storageProvider === 'r2') {
      return new R2StorageService();
    } else if (storageProvider === 'garage') {
      return new GarageStorageService();
    } else {
      throw new Error(
        `Invalid STORAGE_PROVIDER: ${process.env.STORAGE_PROVIDER}. Must be 'garage' or 'R2'`
      );
    }
  },
};
