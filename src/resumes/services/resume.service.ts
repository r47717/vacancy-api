import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Resume } from '../entities/resume.entity';

@Injectable()
export class ResumeService {
  constructor(
    @InjectRepository(Resume)
    private resumesRepository: Repository<Resume>,
  ) {}

  findAll(): Promise<Resume[]> {
    return this.resumesRepository.find();
  }

  count(): Promise<number> {
    return this.resumesRepository.count();
  }

  findOne(id: number): Promise<Resume | null> {
    return this.resumesRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.resumesRepository.delete(id);
  }
}
