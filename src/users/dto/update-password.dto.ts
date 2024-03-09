// import { IUpdatePasswordDto } from '../interfaces/usersInterfaces';
//
// export class UpdatePasswordDto {
//   oldPassword: string;
//   newPassword: string;
// }

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({ description: 'User old password' })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({ description: 'User new password' })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
