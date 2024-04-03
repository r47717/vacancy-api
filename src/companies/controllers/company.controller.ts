import { Controller, Get } from '@nestjs/common';

import { Company } from '../entities/company.entity';
import { CompanyService } from '../services/company.service';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get('list')
  async list(): Promise<Company[]> {
    return await this.companyService.findAll();
  }

  @Get('count')
  async count(): Promise<number> {
    return await this.companyService.count();
  }
}
