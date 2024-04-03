import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Vacancy } from '../entities/vacancy.entity';

@Injectable()
export class VacancyService {
  constructor(
    @InjectRepository(Vacancy)
    private vacanciesRepository: Repository<Vacancy>,
  ) {}

  findAll(): Promise<Vacancy[]> {
    return this.vacanciesRepository.find();
  }

  count(): Promise<number> {
    return this.vacanciesRepository.count();
  }

  findOne(id: number): Promise<Vacancy | null> {
    return this.vacanciesRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.vacanciesRepository.delete(id);
  }
}
