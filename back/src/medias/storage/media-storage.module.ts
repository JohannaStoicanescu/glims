import { Module } from '@nestjs/common';
import { MediaStorage } from './media-storage.interface';
import { R2StorageService } from './R2StorageService';

@Module({
  providers: [
    {
      provide: MediaStorage,
      useClass: R2StorageService, // You can swap this easily
    },
  ],
  exports: [MediaStorage],
})
export class MediaStorageModule { }

