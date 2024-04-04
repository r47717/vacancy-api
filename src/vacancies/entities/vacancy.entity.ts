import { Company } from 'src/companies/entities/company.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { VacancyList } from './vacancyList.entity';

enum TestType {
  NONE = 'NONE',
  QUESTIONNAIRE = 'QUESTIONNAIRE',
  TASK = 'TASK',
}

enum WorkLocation {
  OFFICE = 'OFFICE',
  REMOTE = 'REMOTE',
  HYBRID = 'HYBRID',
}

@Entity()
export class Vacancy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  url: string;

  @Column()
  status: string;

  @Column()
  comment: string;

  @Column({ default: WorkLocation.REMOTE })
  workLocation: WorkLocation;

  @Column({ default: TestType.NONE })
  testType: TestType;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isFavorite: boolean;

  @ManyToOne(() => Company, (company) => company.vacancies)
  company: Company;

  @ManyToMany(() => VacancyList, (list) => list.vacancies)
  vacancyLists: VacancyList;
}
