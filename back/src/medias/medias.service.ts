import { Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { R2StorageService } from './storage/R2StorageService';

@Injectable()
export class MediasService {
  constructor(private mediaStorage: R2StorageService) { }

  create(createMediaDto: CreateMediaDto) {
    this.mediaStorage.upload(createMediaDto.file);
    return 'This action adds a new media';
  }

  findAll() {
    return `This action returns all medias`;
  }

  findOne(id: number) {
    return `This action returns a #${id} media`;
  }

  update(id: number, updateMediaDto: UpdateMediaDto) {
    return `This action updates a #${id} media`;
  }

  remove(id: number) {
    return `This action removes a #${id} media`;
  }
}
