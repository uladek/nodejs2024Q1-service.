import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { randomUUID } from 'crypto';
import { Album } from './entities/album.entity';
import { plainToClass } from 'class-transformer';
import { DatabaseService } from 'src/shared/data-base/data-base.service';

@Injectable()
export class AlbumsService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createAlbumDto: CreateAlbumDto): Album {
    const id = randomUUID();
    const album: Album = {
      id,
      ...createAlbumDto,
    };
    this.databaseService.albums.set(id, album);
    return plainToClass(Album, album);
  }

  findAll(): Album[] {
    return [...this.databaseService.albums.values()];
  }

  findOne(id: string): Album {
    const album = this.databaseService.albums.get(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Album {
    const album = this.databaseService.albums.get(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    const updatedAlbum: Album = {
      ...album,
      ...updateAlbumDto,
    };
    this.databaseService.albums.set(id, updatedAlbum);
    return plainToClass(Album, updatedAlbum);
  }

  remove(id: string): void {
    if (!this.databaseService.albums.has(id)) {
      throw new NotFoundException('Album not found');
    }
    this.databaseService.deleteAlbum(id);
  }
}
