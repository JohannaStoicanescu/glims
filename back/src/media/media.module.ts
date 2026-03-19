import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { MediaRepository } from './media.repository';
import { PrismaService } from 'src/lib/prisma.service';
import { StorageServiceProvider } from 'src/storage/storage.provider';
import { FoldersModule } from 'src/folders/folders.module';

@Module({
  imports: [FoldersModule],
  controllers: [MediaController],
  providers: [
    MediaService,
    MediaRepository,
    PrismaService,
    StorageServiceProvider,
  ],
  exports: [MediaService],
})
export class MediaModule {}
