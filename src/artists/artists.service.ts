import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { v4 as uuidv4 } from 'uuid';
import { plainToClass } from 'class-transformer';
// import { validate } from 'class-validator';
import { validate } from 'uuid';

@Injectable()
export class ArtistsService {
  private artists: Map<string, Artist> = new Map<string, Artist>();

  create(createArtistDto: CreateArtistDto): Artist {
    if (!createArtistDto || !createArtistDto.name || !createArtistDto.grammy) {
      throw new BadRequestException('Invalid data provided');
    }
    // const artist = new Artist(id, createArtistDto.name, createArtistDto.grammy);
    const artist: Artist = {
      id: uuidv4(),
      ...createArtistDto,
    };
    this.artists.set(artist.id, artist);
    return plainToClass(Artist, artist);
    // return artist;
  }

  // create(createUserDto: CreateUserDto): UserResponse {
  //   const { ...userData } = createUserDto;
  //   const newUser: User = {
  //     id: randomUUID(),
  //     ...userData,
  //     version: 1,
  //     createdAt: Date.now(),
  //     updatedAt: Date.now(),
  //   };
  //   this.users.set(newUser.id, newUser);
  //   return plainToClass(UserResponse, newUser);
  // }

  findAll(): Artist[] {
    return [...this.artists.values()];
  }

  findOne(id: string): Artist {
    if (!validate(id)) {
      throw new BadRequestException('Invalid ID provided');
    }
    const artist = this.artists.get(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist {
    if (!validate(id)) {
      throw new BadRequestException('Invalid ID provided');
    }
    const artist = this.findOne(id);
    artist.name = updateArtistDto.name;
    artist.grammy = updateArtistDto.grammy;
    return artist;
  }

  remove(id: string): void {
    if (!validate(id)) {
      throw new BadRequestException('Invalid ID provided');
    }
    const artist = this.findOne(id);
    this.artists.delete(id);
  }
}
