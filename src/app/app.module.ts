import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VacanciesModule } from 'src/vacancies/vacancies.module';
import { CompaniesModule } from 'src/companies/companies.module';
import { Vacancy } from 'src/vacancies/entities/vacancy.entity';
import { Company } from 'src/companies/entities/company.entity';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    VacanciesModule,
    CompaniesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'vacancies',
      username: 'postgres',
      password: 'postgres',
      entities: [Vacancy, Company],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
