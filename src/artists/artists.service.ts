import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { randomUUID } from 'crypto';
import { Artist } from './entities/artist.entity';
import { plainToClass } from 'class-transformer';
import { DatabaseService } from 'src/shared/data-base/data-base.service';

@Injectable()
export class ArtistsService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createArtistDto: CreateArtistDto): Artist {
    const id = randomUUID();
    const artist: Artist = {
      id,
      ...createArtistDto,
    };
    this.databaseService.artists.set(id, artist);
    return plainToClass(Artist, artist);
  }

  findAll(): Artist[] {
    return [...this.databaseService.artists.values()];
  }

  findOne(id: string): Artist {
    const artist = this.databaseService.artists.get(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist {
    const artist = this.databaseService.artists.get(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    const updatedArtist: Artist = {
      ...artist,
      ...updateArtistDto,
    };
    this.databaseService.artists.set(id, updatedArtist);
    return plainToClass(Artist, updatedArtist);
  }

  remove(id: string): void {
    if (!this.databaseService.artists.has(id)) {
      throw new NotFoundException('Artist not found');
    }

    this.databaseService.deleteArtist(id);
  }
}
