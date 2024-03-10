import { Artist } from "src/artists/entities/artist.entity";
import { Track } from "src/tracks/entities/track.entity";
import { User } from "src/users/interfaces/usersInterfaces";

export const users: Map<string, User> = new Map<string, User>();
export const tracks: Map<string, Track> = new Map<string, Track>();
export const artists: Map<string, Artist> = new Map<string, Artist>();
