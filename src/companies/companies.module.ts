import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HHModule } from 'src/hh/hh.module';
import { VacanciesModule } from 'src/vacancies/vacancies.module';

import { CompanyController } from './controllers/company.controller';

import { CompanyService } from './services/company.service';

import { Company } from './entities/company.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company]),
    HHModule,
    forwardRef(() => VacanciesModule),
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
  exports: [CompanyService],
})
export class CompaniesModule {}
