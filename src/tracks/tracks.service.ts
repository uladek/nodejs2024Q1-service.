import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { randomUUID } from 'crypto';
import { Track } from './entities/track.entity';
import { plainToClass } from 'class-transformer';

@Injectable()
export class TracksService {
  private tracks: Map<string, Track> = new Map<string, Track>();

  create(createTrackDto: CreateTrackDto): Track {
    const id = randomUUID();
    const track: Track = {
      id,
      ...createTrackDto,
    };
    this.tracks.set(id, track);
    return plainToClass(Track, track);
  }

  findAll(): Track[] {
    return [...this.tracks.values()];
  }

  findOne(id: string): Track {
    const track = this.tracks.get(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return this.tracks.get(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track {
    const track = this.tracks.get(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    const updatedTrack: Track = {
      ...track,
      ...updateTrackDto,
    };
    this.tracks.set(id, updatedTrack);
    return plainToClass(Track, updatedTrack);
  }

  remove(id: string): void {
    if (!this.tracks.has(id)) {
      throw new NotFoundException('Track not found');
    }
    this.tracks.delete(id);
  }
}
