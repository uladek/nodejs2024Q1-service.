import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/usersInterfaces';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService {
  private users: Map<string, User> = new Map<string, User>();

  create(createUserDto: CreateUserDto): User {
    const newUser: User = {
      id: randomUUID(),
      login: createUserDto.login,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.set(newUser.id, newUser);
    return newUser;
  }

  findAll(): User[] {
    return Array.from(this.users.values());
  }

  findOne(id: string): User | null {
    return this.users.get(id) || null;
  }

  updatePassword(
    id: string,
    newPassword: string,
    oldPassword: string,
  ): User | null {
    const user = this.users.get(id);
    if (!user) return null;
    if (user.password !== oldPassword) return null;
    user.password = newPassword;
    user.version += 1;
    user.updatedAt = Date.now();
    return user;
  }

  remove(id: string): boolean {
    if (!this.users.has(id)) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    this.users.delete(id);
    return true;
  }
}
