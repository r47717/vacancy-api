import { Module } from '@nestjs/common';

import { CompaniesModule } from 'src/companies/companies.module';
import { VacanciesModule } from 'src/vacancies/vacancies.module';

import { DashboardController } from './controllers/dashboard.controller';
import { DashboardService } from './services/dashboard.service';

@Module({
  imports: [CompaniesModule, VacanciesModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
