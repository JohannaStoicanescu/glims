import { Module, forwardRef } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma.service';
import { FoldersService } from './folders.service';
import { FoldersController } from './folders.controller';
import { FoldersRepository } from './folders.repository';
import { StorageServiceProvider } from 'src/storage/storage.provider';
import { TagsModule } from '../tags/tags.module';
import { ReactionsModule } from '../reactions/reactions.module';

@Module({
  imports: [forwardRef(() => TagsModule), ReactionsModule],
  controllers: [FoldersController],
  providers: [
    FoldersService,
    FoldersRepository,
    PrismaService,
    StorageServiceProvider,
  ],
  exports: [FoldersRepository],
})
export class FoldersModule {}
