//

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { randomUUID } from 'crypto';
import { Track } from './entities/track.entity';
import { plainToClass } from 'class-transformer';
import { DatabaseService } from 'src/shared/data-base/data-base.service';

@Injectable()
export class TracksService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createTrackDto: CreateTrackDto): Track {
    const id = randomUUID();
    const track: Track = {
      id,
      ...createTrackDto,
    };
    this.databaseService.tracks.set(id, track);
    return plainToClass(Track, track);
  }

  findAll(): Track[] {
    return [...this.databaseService.tracks.values()];
  }

  findOne(id: string): Track {
    const track = this.databaseService.tracks.get(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track {
    const track = this.databaseService.tracks.get(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    const updatedTrack: Track = {
      ...track,
      ...updateTrackDto,
    };
    this.databaseService.tracks.set(id, updatedTrack);
    return plainToClass(Track, updatedTrack);
  }

  remove(id: string): void {
    if (!this.databaseService.tracks.has(id)) {
      throw new NotFoundException('Track not found');
    }
    this.databaseService.tracks.delete(id);
  }
}
