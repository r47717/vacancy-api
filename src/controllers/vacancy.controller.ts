import { Controller, Get } from '@nestjs/common';
import { Vacancy } from '~models/vacancy.model';
import { VacancyService } from '~services/vacancy.service';

@Controller('vacancy')
export class VacancyController {
  constructor(private readonly vacancyService: VacancyService) {}

  @Get('list')
  list(): Vacancy[] {
    return this.vacancyService.list();
  }

  @Get('count')
  count(): number {
    return this.vacancyService.count();
  }
}
