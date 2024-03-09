import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './interfaces/usersInterfaces';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from './dto/user-responce';

import { validate } from 'uuid';

@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Created', type: UserResponseDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    try {
      if (!createUserDto.login || !createUserDto.password) {
        throw new HttpException(
          'Login and password are required',
          HttpStatus.BAD_REQUEST,
        );
      }
      const newUser = this.usersService.create(createUserDto);
      return newUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async findAll(): Promise<User[]> {
    try {
      const users = await this.usersService.findAll();
      return users;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async findOne(@Param('id') id: string): Promise<User> {
    if (!validate(id)) {
      throw new HttpException('Invalid UUID', HttpStatus.BAD_REQUEST);
    }

    const result = this.usersService.findOne(id);
    if (!result) {
      throw new HttpException('User Not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Patch(':id')
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    try {
      if (!validate(id)) {
        throw new HttpException('Invalid user ID', HttpStatus.BAD_REQUEST);
      }

      const updatedUser = this.usersService.updatePassword(
        id,
        updatePasswordDto,
      );
      if (!updatedUser) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return updatedUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'User ID',
    schema: {
      type: 'string',
      format: 'uuid',
    },
  })
  @ApiResponse({ status: 204, description: 'No Content' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async remove(@Param('id') id: string): Promise<void> {
    if (!validate(id)) {
      throw new HttpException('Invalid user ID', HttpStatus.BAD_REQUEST);
    }

    const result = this.usersService.remove(id);
    if (!result) {
      throw new HttpException('User Not found', HttpStatus.NOT_FOUND);
    }
  }
}
