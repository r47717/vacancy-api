import { Controller, Get, Render } from '@nestjs/common';

import { DashboardService } from '../services/dashboard.service';

@Controller()
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @Render('dashboard')
  async info() {
    const companies = await this.dashboardService.companiesInfo();
    const companyNames = companies.map(({ title }) => title);

    const vacancies = await this.dashboardService.vacanciesInfo();
    const vacancyNames = vacancies.map(({ title }) => title);

    return {
      companies: companyNames,
      vacancies: vacancyNames,
    };
  }
}
