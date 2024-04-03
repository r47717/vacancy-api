import { Controller, Get } from '@nestjs/common';

import { VacancyService } from '../services/vacancy.service';
import { Vacancy } from '../entities/vacancy.entity';

@Controller('vacancy')
export class VacancyController {
  constructor(private readonly vacancyService: VacancyService) {}

  @Get('list')
  async list(): Promise<Vacancy[]> {
    return await this.vacancyService.findAll();
  }

  @Get('count')
  async count(): Promise<number> {
    return await this.vacancyService.count();
  }
}
