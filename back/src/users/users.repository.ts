import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/lib/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getUserById(user_id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id: user_id } });
  }

  async updateUser(
    user_id: string,
    data: Prisma.UserUpdateInput
  ): Promise<User> {
    return this.prisma.user.update({
      where: { id: user_id },
      data,
    });
  }
}
