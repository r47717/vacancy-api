import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VacancyController } from './controllers/vacancy.controller';
import { VacancyService } from './services/vacancy.service';
import { Vacancy } from './entities/vacancy.entity';
import { VacancyList } from './entities/vacancyList.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vacancy, VacancyList])],
  controllers: [VacancyController],
  providers: [VacancyService],
  exports: [VacancyService],
})
export class VacanciesModule {}
