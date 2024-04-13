import { Company } from 'src/companies/entities/company.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  BeforeUpdate,
} from 'typeorm';
import { VacancyList } from './vacancyList.entity';

export enum TestType {
  NONE = 'NONE',
  QUESTIONNAIRE = 'QUESTIONNAIRE',
  TASK = 'TASK',
}

export enum WorkLocation {
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

  @Column({ default: '' })
  hhId: string;

  @Column({ default: '' })
  hhCompanyId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updated = new Date();
  }

  @ManyToOne(() => Company, (company) => company.vacancies, {
    onDelete: 'CASCADE',
  })
  company: Company;

  @ManyToMany(() => VacancyList, (list) => list.vacancies)
  vacancyLists: VacancyList;
}
