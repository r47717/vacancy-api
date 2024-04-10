import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import validator from 'validator';

import { CreateVacancyDTO } from '../dto/vacancy.dto';

@Injectable()
export class CreateVacancyValidationPipe implements PipeTransform {
  transform(value: CreateVacancyDTO) {
    const { title, url, workLocation, testType, isActive, isFavorite } = value;

    if (
      validator.isEmpty(title) ||
      !validator.isURL(url) ||
      !['on', 'off'].includes(isActive) ||
      !['on', 'off'].includes(isFavorite) ||
      !['OFFICE', 'REMOTE', 'HYBRID'].includes(workLocation) ||
      !['NONE', 'QUESTIONNAIRE', 'TASK'].includes(testType)
    ) {
      throw new BadRequestException('Create company DTO valication failed');
    }

    return value;
  }
}
