import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CompanyService } from 'src/companies/services/company.service';
import { HHService } from 'src/hh/services/hh.service';

import { TestType, Vacancy, WorkLocation } from '../entities/vacancy.entity';
import { CreateVacancyDTO } from '../dto/vacancy.dto';
import { Company } from 'src/companies/entities/company.entity';

@Injectable()
export class VacancyService {
  constructor(
    @InjectRepository(Vacancy)
    private vacanciesRepository: Repository<Vacancy>,
    private companyService: CompanyService,

    private readonly hhService: HHService,
  ) {}

  findAll() {
    return this.vacanciesRepository.find();
  }

  getVacanciesByCompany(company: Company) {
    // const { id } = company;
    return this.vacanciesRepository.find({
      where: {
        company,
      },
    });
  }

  count() {
    return this.vacanciesRepository.count();
  }

  findOne(id: number) {
    return this.vacanciesRepository.findOne({
      where: { id },
      relations: { company: true },
    });
  }

  async create(data: CreateVacancyDTO) {
    const {
      title,
      description,
      url,
      status,
      isActive,
      isFavorite,
      comment,
      workLocation,
      testType,
      company: companyId,
    } = data;

    const company = await this.companyService.findOne(+companyId);

    const newVacancyData = await this.vacanciesRepository
      .createQueryBuilder()
      .insert()
      .values({
        title,
        description,
        url,
        status,
        comment,
        isActive: isActive === 'on' ? true : false,
        isFavorite: isFavorite === 'on' ? true : false,
        workLocation: workLocation as WorkLocation,
        testType: testType as TestType,
        company,
      })
      .returning('id')
      .execute();

    const { raw } = newVacancyData;
    const id = raw[0]?.id;

    return id;
  }

  async delete(id: number) {
    return this.vacanciesRepository.delete(id);
  }

  async deleteAll() {
    const data = await this.vacanciesRepository.find({ select: ['id'] });
    await this.vacanciesRepository.delete(data.map(({ id }) => id));
  }

  async loadHHVacancies() {
    const { vacancies } = await this.hhService.getPublicData();

    const existingHhVacancyData = await this.vacanciesRepository.find({
      select: ['hhId'],
    });

    const existingHhVacancyIds = existingHhVacancyData.map(({ hhId }) => hhId);

    const companies = await this.companyService.findAll(); // optimize if too many companies

    for (const vacancyData of vacancies) {
      const { hhId } = vacancyData;

      if (!existingHhVacancyIds.includes(hhId)) {
        const insertResult = await this.vacanciesRepository
          .createQueryBuilder()
          .insert()
          .values(vacancyData)
          .returning('id')
          .execute();

        const { raw } = insertResult;
        const newVacancyId = raw[0]?.id;

        const { hhCompanyId } = vacancyData;

        if (hhCompanyId) {
          const company = companies.find(({ hhId }) => hhCompanyId === hhId);

          await this.vacanciesRepository
            .createQueryBuilder()
            .relation(Vacancy, 'company')
            .of(newVacancyId)
            .set(company);
        }
      }
    }
  }
}
