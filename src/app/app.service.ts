import { Injectable, OnApplicationShutdown } from '@nestjs/common';

@Injectable()
export class AppService implements OnApplicationShutdown {
  info(): string {
    return 'Vacancy API';
  }

  onApplicationShutdown(signal: string) {
    console.log(signal);
  }
}
