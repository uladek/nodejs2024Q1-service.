import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { DatabaseService } from 'src/shared/data-base/data-base.service';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, DatabaseService],
})
export class ArtistsModule {}
