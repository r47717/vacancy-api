import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Redirect,
  Render,
} from '@nestjs/common';

import { VacancyService } from '../services/vacancy.service';
import { Vacancy } from '../entities/vacancy.entity';
import { CompanyService } from 'src/companies/services/company.service';
import { CreateVacancyDTO } from '../dto/vacancy.dto';
import { CreateVacancyValidationPipe } from '../pipes/validation.pipe';

@Controller('vacancy')
export class VacancyController {
  constructor(
    private readonly vacancyService: VacancyService,
    private readonly companyService: CompanyService,
  ) {}

  @Get('list')
  async list(): Promise<Vacancy[]> {
    return await this.vacancyService.findAll();
  }

  @Get('count')
  async count(): Promise<number> {
    return await this.vacancyService.count();
  }

  @Get('show/:id')
  @Render('vacancy')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const vacancy = await this.vacancyService.findOne(id);

    return vacancy;
  }

  @Get('new')
  @Render('create-vacancy')
  async showCreateVacancy() {
    const companies = await this.companyService.findAll();

    return {
      companies,
      csrfToken: 'csrf token will be here later',
    };
  }

  @Post()
  @Redirect()
  async submitCreateVacancy(
    @Body(CreateVacancyValidationPipe) createVacancyDTO: CreateVacancyDTO,
  ) {
    const vacancyId = await this.vacancyService.create(createVacancyDTO);

    return {
      url: `/vacancy/show/${vacancyId}`,
    };
  }

  @Post('delete/:id')
  @Redirect()
  async deleteVacancy(@Param('id', ParseIntPipe) id: number) {
    await this.vacancyService.delete(id);

    return {
      url: '/',
    };
  }

  @Post('load-hh')
  @Redirect()
  async loadHHCompanies() {
    await this.vacancyService.loadHHVacancies();

    return {
      url: '/',
    };
  }

  @Post('delete-all')
  @Redirect()
  async deleteAllVacancies() {
    await this.vacancyService.deleteAll();

    return {
      url: '/',
    };
  }
}
