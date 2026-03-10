import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersRepository } from './users.repository';

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
  constructor(private readonly repository: UsersRepository) {}

  async getUserById(user_id: string): Promise<User> {
    const user = await this.repository.getUserById(user_id);
    if (!user) {
      throw new UserException(UserError.USER_NOT_FOUND);
    }
    return user;
  }
}
