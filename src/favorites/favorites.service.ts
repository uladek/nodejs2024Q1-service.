// import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
// import { Artist } from 'src/artists/entities/artist.entity';
// import { Album } from 'src/albums/entities/album.entity';
// import { Track } from 'src/tracks/entities/track.entity';
// import { DatabaseService } from 'src/shared/data-base/data-base.service';
// import { FavoritesResponse, Favorites } from './entities/favorite.entity';

// @Injectable()
// export class FavoritesService {
//   constructor(private readonly databaseService: DatabaseService) {}

//   findAll(): FavoritesResponse {
//     const artists: Artist[] = [];
//     const albums: Album[] = [];
//     const tracks: Track[] = [];

//     this.databaseService.artists.forEach((artist) => {
//       if (this.isFavorite(artist.id, 'artists')) {
//         artists.push(artist);
//       }
//     });

//     this.databaseService.albums.forEach((album) => {
//       if (this.isFavorite(album.id, 'albums')) {
//         albums.push(album);
//       }
//     });

//     this.databaseService.tracks.forEach((track) => {
//       if (this.isFavorite(track.id, 'tracks')) {
//         tracks.push(track);
//       }
//     });

//     return { artists, albums, tracks };
//   }

//   addTrackToFavorites(trackId: string): void {
//     if (!this.trackExists(trackId)) {
//       throw new HttpException(
//         'Track not found',
//         HttpStatus.UNPROCESSABLE_ENTITY,
//       );
//     }

//     this.addToFavorites(trackId, 'tracks');
//   }

//   removeTrackFromFavorites(trackId: string): void {
//     if (!this.trackExists(trackId)) {
//       throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
//     }

//     this.removeFromFavorites(trackId, 'tracks');
//   }

//   addAlbumToFavorites(albumId: string): void {
//     if (!this.albumExists(albumId)) {
//       throw new HttpException(
//         'Album not found',
//         HttpStatus.UNPROCESSABLE_ENTITY,
//       );
//     }

//     this.addToFavorites(albumId, 'albums');
//   }

//   removeAlbumFromFavorites(albumId: string): void {
//     if (!this.albumExists(albumId)) {
//       throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
//     }

//     this.removeFromFavorites(albumId, 'albums');
//   }

//   addArtistToFavorites(artistId: string): void {
//     if (!this.artistExists(artistId)) {
//       throw new HttpException(
//         'Artist not found',
//         HttpStatus.UNPROCESSABLE_ENTITY,
//       );
//     }

//     this.addToFavorites(artistId, 'artists');
//   }

//   removeArtistFromFavorites(artistId: string): void {
//     if (!this.artistExists(artistId)) {
//       throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
//     }

//     this.removeFromFavorites(artistId, 'artists');
//   }

//   private isFavorite(id: string, entityType: keyof Favorites): boolean {
//     const favorites = this.databaseService.favorites[entityType];
//     return favorites ? favorites.includes(id) : false;
//   }

//   private addToFavorites(id: string, entityType: keyof Favorites): void {
//     let favorites = this.databaseService.favorites[entityType];
//     if (!favorites) {
//       favorites = [];
//     }

//     favorites.push(id);
//     this.databaseService.favorites[entityType] = favorites;
//   }

//   private removeFromFavorites(id: string, entityType: keyof Favorites): void {
//     const favorites = this.databaseService.favorites[entityType];
//     if (!favorites || !favorites.includes(id)) {
//       throw new HttpException(
//         'Entity not found in favorites',
//         HttpStatus.NOT_FOUND,
//       );
//     }

//     this.databaseService.favorites[entityType] = favorites.filter(
//       (favId: string) => favId !== id,
//     );
//   }

//   private trackExists(trackId: string): boolean {
//     return this.databaseService.tracks.has(trackId);
//   }

//   private albumExists(albumId: string): boolean {
//     return this.databaseService.albums.has(albumId);
//   }

//   private artistExists(artistId: string): boolean {
//     return this.databaseService.artists.has(artistId);
//   }
// }

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
