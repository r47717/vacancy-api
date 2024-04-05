import { Controller, Get, Render } from '@nestjs/common';

import { S3Service } from '../services/s3.service';

@Controller('resume')
export class ResumeController {
  constructor(private readonly s3Service: S3Service) {}

  @Get('list')
  @Render('resumeList')
  async list() {
    console.log('getting object list...');
    const resumes = await this.s3Service.listObjects();

    return { resumes };
  }

  @Get('upload')
  async upload() {
    console.log('uploading data...');
    await this.s3Service.uploadSampleData();

    return 'ok';
  }
}
