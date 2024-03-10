import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist } from './entities/artist.entity';
import { v4 as uuidv4 } from 'uuid';
import { plainToClass } from 'class-transformer';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class ArtistsService {
  private artists: Map<string, Artist> = new Map<string, Artist>();

  create(createArtistDto: CreateArtistDto): Artist {
    const artist: Artist = {
      id: randomUUID(),
      ...createArtistDto,
    };
    this.artists.set(artist.id, artist);
    return plainToClass(Artist, artist);
  }

  findAll(): Artist[] {
    return [...this.artists.values()];
  }

  findOne(id: string): Artist {
    const artist = this.artists.get(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist {
    const artist = this.artists.get(id);
    if (!artist) {
      throw new NotFoundException('Artist not found', 'NOT_FOUND');
    }

    const updatedArtist: Artist = {
      ...artist,
      ...updateArtistDto,
    };
    this.artists.set(id, updatedArtist);
    return plainToClass(Artist, updatedArtist);
  }

  remove(id: string): void {
    if (!this.artists.has(id)) {
      throw new NotFoundException('Artist not found');
    }
    this.artists.delete(id);
  }
}
