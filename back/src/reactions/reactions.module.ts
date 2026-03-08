import { Module } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma.service';
import { ReactionsService } from './reactions.service';
import { ReactionsController } from './reactions.controller';
import { ReactionsRepository } from './reactions.repository';

@Module({
  controllers: [ReactionsController],
  providers: [ReactionsService, ReactionsRepository, PrismaService],
  exports: [ReactionsService],
})
export class ReactionsModule {}
