import { Module } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma.service';
import { FoldersService } from './folders.service';
import { FoldersController } from './folders.controller';
import { FoldersRepository } from './folders.repository';
import { GarageStorageService } from 'src/storage/garage.service';

@Module({
  controllers: [FoldersController],
  providers: [FoldersService, FoldersRepository, PrismaService, GarageStorageService],
})
export class FoldersModule { }
