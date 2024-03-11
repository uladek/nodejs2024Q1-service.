import { Injectable } from '@nestjs/common';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class DatabaseService {
  public users: Map<string, User> = new Map<string, User>();
  public tracks: Map<string, Track> = new Map<string, Track>();
  public artists: Map<string, Artist> = new Map<string, Artist>();
  public albums: Map<string, Album> = new Map<string, Album>();

  deleteArtist(id: string): void {
    //   // Выводим информацию об артисте
    console.log('ID', id);

    console.log('this.artists', this.artists);
    console.log('tracks', this.tracks);
    console.log('album', this.albums);

    const tracksToRemove = Array.from(this.tracks.values()).filter(
      (track) => track.artistId === id,
    );
    console.log('Tracks to be removed:', tracksToRemove);

    const albumsToRemove = Array.from(this.albums.values()).filter(
      (album) => album.artistId === id,
    );

    tracksToRemove.forEach((track) => {
      track.artistId = null;
      this.tracks.set(track.id, track);
    });

    albumsToRemove.forEach((album) => {
      album.artistId = null;
      this.albums.set(album.id, album);
    });

    this.artists.delete(id);
  }
}
