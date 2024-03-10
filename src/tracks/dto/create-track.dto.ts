import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateTrackDto {


  @ApiProperty({ description: 'Name of the track' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'ID of the artist associated with the track' })
  @IsString()
  @IsUUID()
  artistId: string | null;

  @ApiProperty({ description: 'ID of the album associated with the track' })
  @IsString()
  @IsUUID()
  albumId: string | null;

  @ApiProperty({ description: 'Duration of the track' })
  @IsNotEmpty()
  duration: number;
}
