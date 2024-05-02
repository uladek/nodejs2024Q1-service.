import { Module } from '@nestjs/common';
import { DatabaseService } from './data-base.service';

@Module({
  controllers: [],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DataBaseModule {}
