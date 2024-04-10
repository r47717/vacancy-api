import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

import { Company } from 'src/companies/entities/company.entity';
import { HHVacancyDTO } from '../dto/hhVacancy.dto';
import {
  TestType,
  Vacancy,
  WorkLocation,
} from 'src/vacancies/entities/vacancy.entity';

type HHResponse = {
  items: HHVacancyDTO[];
};

@Injectable()
export class HHService {
  constructor(private readonly httpService: HttpService) {}

  async getPublicData() {
    const {
      data: { items: hhVacancies },
    } = await firstValueFrom(
      this.httpService
        .get<HHResponse>('https://api.hh.ru/vacancies?text=javascript')
        .pipe(
          catchError((error: AxiosError) => {
            console.error(error);
            throw 'An error happened';
          }),
        ),
    );

    const vacancies: Partial<Vacancy>[] = hhVacancies.map(
      ({
        id,
        name,
        url,
        snippet: { requirement },
        has_test,
        archived,
        employer: { id: employerId },
      }) => ({
        title: name,
        description: requirement || '',
        url,
        status: '',
        comment: '',
        workLocation: WorkLocation.HYBRID,
        testType: has_test ? TestType.TASK : TestType.NONE,
        isActive: !archived,
        isFavorite: false,
        hhId: id,
        hhCompanyId: employerId,
      }),
    );

    const companies: Partial<Company>[] = hhVacancies.reduce<
      Partial<Company>[]
    >((acc, vacancy) => {
      const {
        employer: { id, name, url },
      } = vacancy;

      if (!acc.find(({ id: existingId }) => existingId === +id)) {
        acc.push({
          title: name,
          url,
          description: '',
          rating: '',
          isStartup: false,
          comment: '',
          hhId: id,
        });
      }

      return acc;
    }, []);

    return { vacancies, companies };
  }
}
