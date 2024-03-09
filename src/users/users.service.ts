import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/usersInterfaces';
import { randomUUID } from 'crypto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { plainToClass } from 'class-transformer';
import { UserResponce, UserEntityTyoe } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: Map<string, User> = new Map<string, User>();

  create(createUserDto: CreateUserDto): UserEntityTyoe {
    const newUser: User = {
      id: randomUUID(),
      login: createUserDto.login,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.set(newUser.id, newUser);
    return plainToClass(UserResponce, newUser);
    // return newUser;
  }

  findAll(): User[] {
    return Array.from(this.users.values());
  }

  findOne(id: string): User {
    const user = this.users.get(id);
    if (!user) {
      return null;
    }
    return user;
  }

  updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): User | null {
    const user = this.users.get(id);
    if (!user) return null;
    if (user.password !== updatePasswordDto.oldPassword) return null;

    const updatedUser: User = {
      ...user,
      password: updatePasswordDto.newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    };

    this.users.set(id, updatedUser);
    // return updatedUser;
    return plainToClass(UserResponce, updatedUser);
  }

  remove(id: string): boolean {
    if (!this.users.has(id)) {
      return false;
    }
    this.users.delete(id);
    return true;
  }
}
