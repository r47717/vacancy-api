import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { CompanyService } from 'src/companies/services/company.service';
import { VacancyService } from 'src/vacancies/services/vacancy.service';

@Injectable()
export class DashboardService {
  constructor(
    private readonly companyService: CompanyService,
    private readonly vacancyService: VacancyService,
    private dataSource: DataSource,
  ) {}

  async companiesInfo() {
    return await this.companyService.findAll();
  }

  async vacanciesInfo() {
    return await this.vacancyService.findAll();
  }

  async vacancySummary() {
    return await this.dataSource.query(`
      select c.id, c.title, count(*) 
      from public.company c
      left outer join public.vacancy v on c.id = v."companyId"
      where (v."hhId" is not null) and (c."hhId" is not null)
      group by c.id
      having count(*) > 0
      order by count(*) desc
    `);
  }

  async vacanciesByKeyword(keyword: string) {
    return await this.dataSource.query(
      `
      select v.id as vid, v.title as vtitle, c.id as cid, c.title as ctitle
      from public.vacancy v
      left join public.company c on v."companyId" = c.id
      where v.title like '%:keyword%'
      order by v.title
    `,
      [{ keyword }],
    );
  }
}
