import { S3Client } from '@aws-sdk/client-s3';

const REGION = 'ru-central1';

const ENDPOINT = 'https://storage.yandexcloud.net';

const s3Client = new S3Client({ region: REGION, endpoint: ENDPOINT });

export default s3Client;
