import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty({ description: 'Name of the album' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Year of the album' })
  @IsNotEmpty()
  @IsNumber()
  year: number;

  @ApiProperty({ description: 'ID of the artist associated with the album' })
  @IsString()
  @IsUUID(4)
  @IsOptional()
  artistId: string | null;
}