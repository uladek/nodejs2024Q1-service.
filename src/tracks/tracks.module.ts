import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { DataBaseModule } from 'src/shared/data-base/data-base.module';

@Module({
  controllers: [TracksController],
  providers: [TracksService],
  imports: [DataBaseModule],
})
export class TracksModule {}
