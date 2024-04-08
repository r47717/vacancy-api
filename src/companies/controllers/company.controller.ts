import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Redirect,
  Render,
} from '@nestjs/common';

import { CompanyService } from '../services/company.service';
import { CreateCompanyDTO } from '../dto/company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get('list')
  async list() {
    return await this.companyService.findAll();
  }

  @Get('count')
  async count() {
    return await this.companyService.count();
  }

  @Get('show/:id')
  @Render('company')
  async findOne(@Param('id') id: number) {
    const company = await this.companyService.findOne(id);

    return company;
  }

  @Get('new')
  @Render('create-company')
  async showCreateCompany() {
    return {
      csrfToken: 'csrf token will be here later',
    };
  }

  @Post()
  @Redirect()
  async createCompany(@Body() createCompanyDTO: CreateCompanyDTO) {
    const companyId = await this.companyService.create(createCompanyDTO);

    return {
      url: `/company/show/${companyId}`,
    };
  }

  @Post('delete/:id')
  @Redirect()
  async deleteCompany(@Param('id') id: number) {
    await this.companyService.delete(id);

    return {
      url: '/',
    };
  }
}
