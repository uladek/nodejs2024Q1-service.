import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { validate } from 'uuid';
import { randomUUID } from 'crypto';
import { v4 as newuuidv4 } from 'uuid';

export interface Track {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}

@Injectable()
export class TracksService {
  private tracks: Map<string, Track> = new Map<string, Track>();

  // create(createTrackDto: CreateTrackDto) {
  //   return 'This action adds a new track';
  // }
  create(createTrackDto: Partial<Track>): Track {
    const trackId: string = newuuidv4();

    const requiredFields = ['name', 'duration']; // Define required fields for a track
    for (const field of requiredFields) {
      if (!(field in createTrackDto)) {
        throw new BadRequestException(`Missing required field: ${field}`);
      }
    }

    const track: Track = {
      id: trackId,
      ...(createTrackDto as Track), // Type assertion to resolve the error
    };
    this.tracks.set(trackId, track);
    return track;
  }

  // findAll() {
  //   return `This action returns all tracks`;
  // }

  findAll() {
    return Array.from(this.tracks.values());
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} track`;
  // }

  findOne(id: string): Track {
    if (!validate(id)) {
      throw new BadRequestException(`Invalid trackId: ${id}`);
    }

    const track = this.tracks.get(id);
    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    return track;
  }

  update(id: number, updateTrackDto: UpdateTrackDto) {
    return `This action updates a #${id} track`;
  }

  remove(id: number) {
    return `This action removes a #${id} track`;
  }
}
function uuidv4() {
  throw new Error('Function not implemented.');
}
