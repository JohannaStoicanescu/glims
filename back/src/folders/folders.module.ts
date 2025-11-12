import { Module } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma.service';
import { FoldersService } from './folders.service';
import { FoldersController } from './folders.controller';

@Module({
  controllers: [FoldersController],
  providers: [FoldersService, PrismaService],
})
export class FoldersModule {}
