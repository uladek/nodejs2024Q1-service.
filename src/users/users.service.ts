import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { login, password } = createUserDto;
    if (!login || !password) {
      throw new HttpException('Login and password are required', 400);
    }

    const SALT = Number(process.env.CRYPT_SALT);
    const hashedPassword = await bcrypt.hash(password, SALT);

    console.log('Creating user with login:', login);

    const { ...userData } = createUserDto;
    const createdAt = new Date();
    const updatedAt = new Date();
    const newUser = await this.prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
        version: 1,
        createdAt: createdAt,
        updatedAt: updatedAt,
      },
    });

    return plainToClass(User, {
      ...newUser,
      createdAt: newUser.createdAt.getTime(),
      updatedAt: newUser.updatedAt.getTime(),
    });
  }

  // async findAll(): Promise<User[]> {
  //   const users = await this.prisma.user.findMany();
  //   return users.map((user) => ({
  //     ...user,
  //     createdAt: user.createdAt.getTime(),
  //     updatedAt: user.updatedAt.getTime(),
  //   }));
  // }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users;
  }

  // async findOne(id: string): Promise<User> {
  //   const user = await this.prisma.user.findUnique({ where: { id } });
  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }

  //   return {
  //     ...user,
  //     createdAt: user.createdAt.getTime(),
  //     updatedAt: user.updatedAt.getTime(),
  //   };
  // }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    const { oldPassword, newPassword } = updatePasswordDto;
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      throw new HttpException('Old password is wrong', HttpStatus.FORBIDDEN);
    }

    const SALT = Number(process.env.CRYPT_SALT);
    const hashedNewPassword = await bcrypt.hash(newPassword, SALT);

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: hashedNewPassword,
        version: user.version + 1,
        updatedAt: new Date(),
      },
    });

    return plainToClass(User, {
      ...updatedUser,
      createdAt: updatedUser.createdAt.getTime(),
      updatedAt: updatedUser.updatedAt.getTime(),
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.user.delete({ where: { id } });
  }

  async findByLogin(login: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        login,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
