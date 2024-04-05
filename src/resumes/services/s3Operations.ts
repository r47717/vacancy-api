import { PutObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';

import s3Client from './S3Client';

export const uploadSampleData = async () => {
  const params = {
    Bucket: 'r47717-vacancies',
    Key: 'sample-resume.txt',
    Body: 'test data',
  };

  try {
    const results = await s3Client.send(new PutObjectCommand(params));
    console.log('results', results);
    return results;
  } catch (err) {
    console.log('Error', err);
  }
};

export const listObjects = async () => {
  const params = {
    Bucket: 'r47717-vacancies',
  };

  try {
    const results = await s3Client.send(new ListObjectsV2Command(params));
    console.log('results', results);
    return results;
  } catch (err) {
    console.log('Error', err);
  }
};
