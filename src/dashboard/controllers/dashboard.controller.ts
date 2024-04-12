import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Render,
  Req,
  Request,
} from '@nestjs/common';

import { DashboardService } from '../services/dashboard.service';

const keywordKey = 'keyword';

@Controller()
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @Render('dashboard')
  async info(@Req() request: Request & { session: Record<string, string> }) {
    const companies = await this.dashboardService.companiesInfo();
    const companyData = companies.map(({ id, title }) => ({ id, title }));

    const vacancies = await this.dashboardService.vacanciesInfo();
    const vacancyNames = vacancies.map(({ id, title }) => ({ id, title }));

    const summary = await this.dashboardService.vacancySummary();

    const keyword = request.session[keywordKey];
    const byKeyword = keyword
      ? await this.dashboardService.vacanciesByKeyword(keyword)
      : [];

    return {
      companies: companyData,
      vacancies: vacancyNames,
      summary,
      keyword,
      byKeyword,
    };
  }

  @Post('submit-keyword')
  @Redirect()
  async submitByKeyword(
    @Body('keyword') keyword: string,
    @Req() request: Request & { session: Record<string, string> },
  ) {
    if (keyword) {
      request.session[keywordKey] = keyword;
    }

    return {
      url: '/',
    };
  }
}
