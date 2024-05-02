import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateTrackDto {
  @ApiProperty({ description: 'Name of the track' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'ID of the artist associated with the track' })
  @IsString()
  @IsUUID(4)
  @IsOptional()
  artistId: string | null;

  @ApiProperty({ description: 'ID of the album associated with the track' })
  @IsString()
  @IsUUID(4)
  @IsOptional()
  albumId: string | null;

  @ApiProperty({ description: 'Duration of the track' })
  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
