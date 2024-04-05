import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ResumeController } from './controllers/resume.controller';
import { ResumeService } from './services/resume.service';
import { S3Service } from './services/s3.service';
import { Resume } from './entities/resume.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Resume])],
  controllers: [ResumeController],
  providers: [ResumeService, S3Service],
})
export class ResumeModule {}
