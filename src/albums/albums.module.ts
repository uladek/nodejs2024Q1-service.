import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { DatabaseService } from 'src/shared/data-base/data-base.service';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, DatabaseService],
})
export class AlbumsModule {}
