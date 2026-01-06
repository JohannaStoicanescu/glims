import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { MediaRepository } from './media.repository';
import { PrismaService } from 'src/lib/prisma.service';
import { GarageStorageService } from 'src/storage/garage.service';

@Module({
  controllers: [MediaController],
  providers: [
    MediaService,
    MediaRepository,
    PrismaService,
    GarageStorageService,
  ],
  exports: [MediaService],
})
export class MediaModule {}
