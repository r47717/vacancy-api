import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VacancyController } from './controllers/vacancy.controller';
import { VacancyService } from './services/vacancy.service';
import { Vacancy } from './entities/vacancy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vacancy])],
  controllers: [VacancyController],
  providers: [VacancyService],
})
export class VacanciesModule {}
