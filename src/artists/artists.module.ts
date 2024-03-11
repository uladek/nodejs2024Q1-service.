import { DataBaseModule } from './../shared/data-base/data-base.module';
import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService],
  imports: [DataBaseModule],
})
export class ArtistsModule {}
