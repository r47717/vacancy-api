import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Company } from '../entities/company.entity';
import { CreateCompanyDTO } from '../dto/company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companiesRepository: Repository<Company>,
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
}
