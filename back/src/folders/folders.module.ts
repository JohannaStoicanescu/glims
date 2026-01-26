import { Module, forwardRef } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma.service';
import { FoldersService } from './folders.service';
import { FoldersController } from './folders.controller';
import { FoldersRepository } from './folders.repository';
import { S3StorageService } from 'src/storage/s3-storage.service';
import { TagsModule } from '../tags/tags.module';

@Module({
  imports: [forwardRef(() => TagsModule)],
  controllers: [FoldersController],
  providers: [
    FoldersService,
    FoldersRepository,
    PrismaService,
    S3StorageService,
  ],
  exports: [FoldersRepository],
})
export class FoldersModule {}
