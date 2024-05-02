import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FavoritesResponse } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<FavoritesResponse> {
    const artists = await this.prisma.artist.findMany({
      where: { favorites: { some: {} } },
    });
    const albums = await this.prisma.album.findMany({
      where: { favorites: { some: {} } },
    });
    const tracks = await this.prisma.track.findMany({
      where: { favorites: { some: {} } },
    });
    return { artists, albums, tracks };
  }

  async addTrackToFavorites(trackId: string): Promise<void> {
    const track = await this.prisma.track.findUnique({
      where: { id: trackId },
    });
    if (!track) {
      throw new HttpException(
        'Track not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    await this.prisma.track.update({
      where: { id: trackId },
      data: { favorites: { create: {} } },
    });
  }

  async removeTrackFromFavorites(trackId: string): Promise<void> {
    const track = await this.prisma.track.findUnique({
      where: { id: trackId },
    });
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    await this.prisma.track.update({
      where: { id: trackId },
      data: { favorites: { deleteMany: {} } },
    });
  }

  async addAlbumToFavorites(albumId: string): Promise<void> {
    const album = await this.prisma.album.findUnique({
      where: { id: albumId },
    });
    if (!album) {
      throw new HttpException(
        'Album not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    await this.prisma.album.update({
      where: { id: albumId },
      data: { favorites: { create: {} } },
    });
  }

  async removeAlbumFromFavorites(albumId: string): Promise<void> {
    const album = await this.prisma.album.findUnique({
      where: { id: albumId },
    });
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    await this.prisma.album.update({
      where: { id: albumId },
      data: { favorites: { deleteMany: {} } },
    });
  }

  async addArtistToFavorites(artistId: string): Promise<void> {
    const artist = await this.prisma.artist.findUnique({
      where: { id: artistId },
    });
    if (!artist) {
      throw new HttpException(
        'Artist not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    await this.prisma.artist.update({
      where: { id: artistId },
      data: { favorites: { create: {} } },
    });
  }

  async removeArtistFromFavorites(artistId: string): Promise<void> {
    const artist = await this.prisma.artist.findUnique({
      where: { id: artistId },
    });
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    await this.prisma.artist.update({
      where: { id: artistId },
      data: { favorites: { deleteMany: {} } },
    });
  }
}
