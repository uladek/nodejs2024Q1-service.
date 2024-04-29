import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  HttpStatus,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { Prisma } from '@prisma/client';
import { FavoritesResponse } from './entities/favorite.entity';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async findAll(): Promise<FavoritesResponse> {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  async addTrackToFavorites(
    @Param('id', ParseUUIDPipe) trackId: string,
  ): Promise<{ message: string }> {
    await this.favoritesService.addTrackToFavorites(trackId);
    return { message: 'Track added to favorites' };
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrackFromFavorites(
    @Param('id', ParseUUIDPipe) trackId: string,
  ): Promise<void> {
    await this.favoritesService.removeTrackFromFavorites(trackId);
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  async addAlbumToFavorites(
    @Param('id', ParseUUIDPipe) albumId: string,
  ): Promise<{ message: string }> {
    await this.favoritesService.addAlbumToFavorites(albumId);
    return { message: 'Album added to favorites' };
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbumFromFavorites(
    @Param('id', ParseUUIDPipe) albumId: string,
  ): Promise<void> {
    await this.favoritesService.removeAlbumFromFavorites(albumId);
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  async addArtistToFavorites(
    @Param('id', ParseUUIDPipe) artistId: string,
  ): Promise<{ message: string }> {
    await this.favoritesService.addArtistToFavorites(artistId);
    return { message: 'Artist added to favorites' };
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtistFromFavorites(
    @Param('id', ParseUUIDPipe) artistId: string,
  ): Promise<void> {
    await this.favoritesService.removeArtistFromFavorites(artistId);
  }
}
