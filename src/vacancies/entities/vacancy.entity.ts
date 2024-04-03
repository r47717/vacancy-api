import { Company } from 'src/companies/entities/company.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

enum TestType {
  NONE = 'NONE',
  QUESTIONNAIRE = 'QUESTIONNAIRE',
  TASK = 'TASK',
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

  @Column()
  test: TestType;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Company, (company) => company.vacancies)
  company: Company;
}
