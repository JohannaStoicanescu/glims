import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UsersRepository } from './users.repository';
import { S3StorageService } from 'src/storage/s3-storage.service';
import { randomUUID } from 'crypto';

export enum UserError {
  USER_NOT_FOUND = 'User not found',
}

export class UserException extends Error {
  constructor(public readonly type: UserError) {
    super(type);
  }
}

@Injectable()
export class UsersService {
  constructor(
    private readonly repository: UsersRepository,
    private readonly storage: S3StorageService
  ) {}

  async getUserById(user_id: string): Promise<User> {
    const user = await this.repository.getUserById(user_id);
    if (!user) {
      throw new UserException(UserError.USER_NOT_FOUND);
    }
    return user;
  }

  async updateUserProfile(
    user_id: string,
    data: Prisma.UserUpdateInput
  ): Promise<User> {
    try {
      return await this.repository.updateUser(user_id, data);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new UserException(UserError.USER_NOT_FOUND);
      }
      throw error;
    }
  }

  async updateProfileImage(
    user_id: string,
    file: Buffer,
    contentType: string
  ): Promise<User> {
    const key = `avatars/${user_id}/${randomUUID()}`;
    const storage_id = await this.storage.uploadFile(key, file, contentType);
    const imageUrl = await this.storage.getPresignedUrl(storage_id);

    return this.updateUserProfile(user_id, { image: imageUrl });
  }
}
