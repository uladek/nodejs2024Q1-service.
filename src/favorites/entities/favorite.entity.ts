import { IsArray } from 'class-validator';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export class Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];

  constructor(
    artists: string[] = [],
    albums: string[] = [],
    tracks: string[] = [],
  ) {
    this.artists = artists;
    this.albums = albums;
    this.tracks = tracks;
  }
}
