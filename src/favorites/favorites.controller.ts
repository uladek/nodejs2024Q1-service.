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
import { FavoritesResponse } from './entities/favorite.entity';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll(): FavoritesResponse {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  addTrackToFavorites(@Param('id', ParseUUIDPipe) trackId: string) {
    this.favoritesService.addTrackToFavorites(trackId);
    return { message: 'Track added to favorites' };
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrackFromFavorites(@Param('id', ParseUUIDPipe) trackId: string) {
    this.favoritesService.removeTrackFromFavorites(trackId);
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  addAlbumToFavorites(@Param('id', ParseUUIDPipe) albumId: string) {
    this.favoritesService.addAlbumToFavorites(albumId);
    return { message: 'Album added to favorites' };
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbumFromFavorites(@Param('id', ParseUUIDPipe) albumId: string) {
    this.favoritesService.removeAlbumFromFavorites(albumId);
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  addArtistToFavorites(@Param('id', ParseUUIDPipe) artistId: string) {
    this.favoritesService.addArtistToFavorites(artistId);
    return { message: 'Artist added to favorites' };
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtistFromFavorites(@Param('id', ParseUUIDPipe) artistId: string) {
    this.favoritesService.removeArtistFromFavorites(artistId);
  }
}
