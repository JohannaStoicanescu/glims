import { Module } from '@nestjs/common';
import { R2StorageService } from './R2StorageService';

@Module({
  providers: [
    R2StorageService,
  ],
})
export class MediaStorageModule { }

