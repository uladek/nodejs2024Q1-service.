import { Injectable } from '@nestjs/common';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { User } from 'src/users/interfaces/usersInterfaces';

@Injectable()
export class DatabaseService {
  public readonly users: Map<string, User> = new Map<string, User>();
  public readonly tracks: Map<string, Track> = new Map<string, Track>();
  public readonly artists: Map<string, Artist> = new Map<string, Artist>();
  public readonly albums: Map<string, Album> = new Map<string, Album>();
}
