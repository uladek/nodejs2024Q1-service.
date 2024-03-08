// import { ICreateUserDto } from '../interfaces/usersInterfaces';

// export class CreateUserDto implements ICreateUserDto {
//   login: string;
//   password: string;
// }

// export class CreateUserDto {
//   login: string;
//   password: string;
// }

// export interface CreateUserDto {
//   login: string;
//   password: string;
// }

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'User login' })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ description: 'User password' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
