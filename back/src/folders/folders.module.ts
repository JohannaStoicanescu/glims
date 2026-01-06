import { Module, forwardRef } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma.service';
import { FoldersService } from './folders.service';
import { FoldersController } from './folders.controller';
import { FoldersRepository } from './folders.repository';
import { GarageStorageService } from 'src/storage/garage.service';
import { TagsModule } from '../tags/tags.module';

@Module({
  imports: [forwardRef(() => TagsModule)],
  controllers: [FoldersController],
  providers: [
    FoldersService,
    FoldersRepository,
    PrismaService,
    GarageStorageService,
  ],
  exports: [FoldersRepository],
})
export class FoldersModule {}
