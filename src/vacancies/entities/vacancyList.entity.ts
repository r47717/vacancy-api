import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Vacancy } from './vacancy.entity';

@Entity()
export class VacancyList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToMany(() => Vacancy, (vacancy) => vacancy.vacancyLists)
  @JoinTable()
  vacancies: Vacancy;
}
