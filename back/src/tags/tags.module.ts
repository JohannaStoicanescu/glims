import { Module, forwardRef } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma.service';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { TagsRepository } from './tags.repository';
import { FoldersModule } from '../folders/folders.module';

@Module({
  imports: [forwardRef(() => FoldersModule)],
  controllers: [TagsController],
  providers: [TagsService, TagsRepository, PrismaService],
  exports: [TagsService],
})
export class TagsModule {}
