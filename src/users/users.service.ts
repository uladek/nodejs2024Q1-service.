import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { DatabaseService } from 'src/shared/data-base/data-base.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createUserDto: CreateUserDto): User {
    const { login, password } = createUserDto;
    if (!login || !password) {
      throw new HttpException('Login and password are required', 400);
    }
    const id = randomUUID();

    const { ...userData } = createUserDto;
    const newUser: User = {
      id: id,
      ...userData,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.databaseService.users.set(id, newUser);
    return plainToClass(User, newUser);
  }

  findAll(): User[] {
    return [...this.databaseService.users.values()];
  }

  findOne(id: string): User {
    const user = this.databaseService.users.get(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  updatePassword(id: string, updatePasswordDto: UpdatePasswordDto): User {
    const { oldPassword, newPassword } = updatePasswordDto;
    const user = this.databaseService.users.get(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password !== oldPassword) {
      throw new HttpException('Old password is wrong', HttpStatus.FORBIDDEN);
    }

    const updatedUser: User = {
      ...user,
      password: updatePasswordDto.newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    };

    this.databaseService.users.set(id, updatedUser);
    return plainToClass(User, updatedUser);
  }

  remove(id: string): void {
    if (!this.databaseService.users.has(id)) {
      throw new NotFoundException('User not found');
    }
    this.databaseService.users.delete(id);
  }
}
