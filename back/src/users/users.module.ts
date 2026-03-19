import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { PrismaService } from 'src/lib/prisma.service';
import { StorageServiceProvider } from 'src/storage/storage.provider';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    PrismaService,
    StorageServiceProvider,
  ],
  exports: [UsersService],
})
export class UsersModule {}
