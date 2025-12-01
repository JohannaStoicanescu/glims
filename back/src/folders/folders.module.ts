import { Module } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma.service';
import { FoldersService } from './folders.service';
import { FoldersController } from './folders.controller';
import { FoldersRepository } from './folders.repository';

@Module({
  controllers: [FoldersController],
  providers: [FoldersService, FoldersRepository, PrismaService],
})
export class FoldersModule {}
