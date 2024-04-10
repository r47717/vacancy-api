import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import validator from 'validator';

import { CreateCompanyDTO } from '../dto/company.dto';

@Injectable()
export class CreateCompanyValidationPipe implements PipeTransform {
  transform(value: CreateCompanyDTO) {
    const { title, url } = value;

    if (validator.isEmpty(title) || !validator.isURL(url)) {
      throw new BadRequestException('Create company DTO valication failed');
    }

    return value;
  }
}
