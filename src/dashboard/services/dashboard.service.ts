import { Injectable } from '@nestjs/common';

import { CompanyService } from 'src/companies/services/company.service';
import { VacancyService } from 'src/vacancies/services/vacancy.service';
import { Company } from 'src/companies/entities/company.entity';
import { Vacancy } from 'src/vacancies/entities/vacancy.entity';

@Injectable()
export class DashboardService {
  constructor(
    private readonly companyService: CompanyService,
    private readonly vacancyService: VacancyService,
  ) {}

  async companiesInfo(): Promise<Company[]> {
    return await this.companyService.findAll();
  }

  async vacanciesInfo(): Promise<Vacancy[]> {
    return await this.vacancyService.findAll();
  }
}
