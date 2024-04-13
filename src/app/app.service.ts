import { BeforeApplicationShutdown, Injectable } from '@nestjs/common';

@Injectable()
export class AppService implements BeforeApplicationShutdown {
  info(): string {
    return 'Vacancy API';
  }

  beforeApplicationShutdown(signal: string) {
    console.log(signal);
  }
}
