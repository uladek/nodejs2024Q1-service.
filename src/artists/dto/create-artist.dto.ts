import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty({ description: 'Name of the artist' })
  @IsNotEmpty()
  // @IsString()
  name: string;

  @ApiProperty({ description: 'Indicates if the artist has won a Grammy' })
  @IsBoolean()
  grammy: boolean;
}
