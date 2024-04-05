import { Injectable } from '@nestjs/common';

import { uploadSampleData, listObjects } from './s3Operations';

@Injectable()
export class S3Service {
  async listObjects(): Promise<string[]> {
    const { Contents: data } = await listObjects();
    const listOfFiles = data
      .filter(({ Key }) => !Key.endsWith('/'))
      .map(({ Key }) => Key);

    return listOfFiles;
  }

  async uploadSampleData(): Promise<void> {
    await uploadSampleData();
  }
}
