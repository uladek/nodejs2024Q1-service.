import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateTrackDto {
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
