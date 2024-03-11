import { ArtistsService } from './../artists/artists.service';
import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { DatabaseService } from 'src/shared/data-base/data-base.service';
import { DataBaseModule } from 'src/shared/data-base/data-base.module';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService],
  imports: [DataBaseModule],
})
export class AlbumsModule {}
