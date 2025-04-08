import { Module } from '@nestjs/common';
import { MediasService } from './medias.service';
import { MediasController } from './medias.controller';
import { MediaStorageModule } from './storage/media-storage.module';

@Module({
  imports: [MediaStorageModule],
  controllers: [MediasController],
  providers: [MediasService],
})
export class MediasModule { }
