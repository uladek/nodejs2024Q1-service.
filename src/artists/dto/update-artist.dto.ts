import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateArtistDto } from './create-artist.dto';
import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

// export class UpdateArtistDto extends PartialType(CreateArtistDto) {}

export class UpdateArtistDto {
  @ApiProperty({ description: 'Name of the artist' })
  @IsNotEmpty()
  // @IsString()
  name: string;

  @ApiProperty({ description: 'Indicates if the artist has won a Grammy' })
  @IsBoolean()
  grammy: boolean;
}
