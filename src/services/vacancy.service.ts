import { Injectable } from '@nestjs/common';
import { Vacancy } from '~models/vacancy.model';

const mockVacancies = [
  {
    name: 'vacancy 1',
    description: 'vacancy 1 description',
  },
  {
    name: 'vacancy 2',
    description: 'vacancy 2 description',
  },
  {
    name: 'vacancy 3',
    description: 'vacancy 3 description',
  },
];

@Injectable()
export class VacancyService {
  list(): Vacancy[] {
    return mockVacancies;
  }

  count(): number {
    return mockVacancies.length;
  }
}
