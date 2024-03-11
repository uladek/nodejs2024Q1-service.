import { Injectable } from '@nestjs/common';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class DatabaseService {
  public readonly users: Map<string, User> = new Map<string, User>();
  public readonly tracks: Map<string, Track> = new Map<string, Track>();
  public readonly artists: Map<string, Artist> = new Map<string, Artist>();
  public readonly albums: Map<string, Album> = new Map<string, Album>();

  // deleteArtist(artistId: string): void {
  //   for (const track of this.tracks.values()) {
  //     if (track.artistId === artistId) {
  //       track.artistId = null;
  //     }
  //   }

  //   for (const album of this.albums.values()) {
  //     if (album.artistId === artistId) {
  //       album.artistId = null;
  //     }
  //   }
  // }
}
