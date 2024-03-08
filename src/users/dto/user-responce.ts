import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUUID,
  IsDefined,
} from 'class-validator';
import { UserEntity } from '../entities/user.entity';

export class UserResponseDto implements Partial<UserEntity> {
  @ApiProperty({ description: 'User ID' })
  @IsUUID(4, { message: 'Invalid UUID format' })
  @IsNotEmpty({ message: 'UUID cannot be empty' })
  id: string;

  @ApiProperty({ description: 'User login' })
  @IsString({ message: 'Login must be a string' })
  @IsNotEmpty({ message: 'Login cannot be empty' })
  login: string;

  @ApiProperty({ description: 'User version' })
  @IsInt({ message: 'Version must be an integer' })
  @IsPositive({ message: 'Version must be positive' })
  @IsDefined({ message: 'Version must be defined' })
  version: number;

  @ApiProperty({ description: 'Timestamp of user creation' })
  @IsDate({ message: 'CreatedAt must be a valid date' })
  @IsDefined({ message: 'CreatedA must be defined' })
  createdAt: number;

  @ApiProperty({ description: 'Timestamp of last user update' })
  @IsDate({ message: 'UpdatedAt must be a valid date' })
  @IsDefined({ message: 'CreatedA must be defined' })
  updatedAt: number;
}
