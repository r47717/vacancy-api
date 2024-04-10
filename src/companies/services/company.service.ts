import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { HHService } from 'src/hh/services/hh.service';

import { Company } from '../entities/company.entity';
import { CreateCompanyDTO } from '../dto/company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companiesRepository: Repository<Company>,
    private readonly hhService: HHService,
  ) {}

  findAll() {
    return this.companiesRepository.find();
  }

  count() {
    return this.companiesRepository.count();
  }

  findOne(id: number) {
    return this.companiesRepository.findOneBy({ id });
  }

  async create(data: CreateCompanyDTO) {
    const { title, description, url, rating, isStartup, comment } = data;

    const newCompanyData = await this.companiesRepository
      .createQueryBuilder()
      .insert()
      .values({
        title,
        description,
        url,
        rating,
        isStartup,
        comment,
      })
      .returning('id')
      .execute();

    const { raw } = newCompanyData;
    const id = raw[0]?.id;

    return id;
  }

  async delete(id: number) {
    return this.companiesRepository.delete(id);
  }

  async deleteAll() {
    // return this.companiesRepository.clear(); - trancates table, does not cascade deletes

    const companyData = await this.companiesRepository.find({ select: ['id'] });
    await this.companiesRepository.delete(companyData.map(({ id }) => id));
  }

  async loadHHCompanies() {
    const { companies } = await this.hhService.getPublicData();

    const existingHhData = await this.companiesRepository.find({
      select: ['hhId'],
    });

    const existingHhIds = existingHhData.map(({ hhId }) => hhId);

    for (const companyData of companies) {
      const { hhId } = companyData;

      if (!existingHhIds.includes(hhId)) {
        await this.companiesRepository
          .createQueryBuilder()
          .insert()
          .values(companyData)
          .execute();
      }
    }
  }
}
