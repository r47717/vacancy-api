import { Module } from '@nestjs/common';
import { AppController } from '~controllers/app.controller';
import { VacancyController } from '~controllers/vacancy.controller';
import { AppService } from '~services/app.service';
import { VacancyService } from '~services/vacancy.service';

@Module({
  imports: [],
  controllers: [AppController, VacancyController],
  providers: [AppService, VacancyService],
})
export class AppModule {}
