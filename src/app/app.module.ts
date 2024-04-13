import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VacanciesModule } from 'src/vacancies/vacancies.module';
import { CompaniesModule } from 'src/companies/companies.module';
import { DashboardModule } from 'src/dashboard/dashboard.module';
import { ResumeModule } from 'src/resumes/resumes.module';
import { HealthModule } from 'src/health/health.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    VacanciesModule,
    CompaniesModule,
    DashboardModule,
    ResumeModule,
    HealthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'vacancies',
      username: 'postgres',
      password: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
