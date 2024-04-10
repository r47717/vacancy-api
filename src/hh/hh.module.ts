import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { HHService } from './services/hh.service';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [HHService],
  exports: [HHService],
})
export class HHModule {}
