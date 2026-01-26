import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { MediaRepository } from './media.repository';
import { PrismaService } from 'src/lib/prisma.service';
import { S3StorageService } from 'src/storage/s3-storage.service';

@Module({
  controllers: [MediaController],
  providers: [
    MediaService,
    MediaRepository,
    PrismaService,
    S3StorageService,
  ],
  exports: [MediaService],
})
export class MediaModule {}
