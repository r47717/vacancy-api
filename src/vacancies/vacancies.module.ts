import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HHModule } from 'src/hh/hh.module';
import { CompaniesModule } from 'src/companies/companies.module';

import { VacancyController } from './controllers/vacancy.controller';

import { VacancyService } from './services/vacancy.service';

import { Vacancy } from './entities/vacancy.entity';
import { VacancyList } from './entities/vacancyList.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vacancy, VacancyList]),
    forwardRef(() => CompaniesModule),
    HHModule,
  ],
  controllers: [VacancyController],
  providers: [VacancyService],
  exports: [VacancyService],
})
export class VacanciesModule {}
