import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  BeforeUpdate,
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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updated = new Date();
  }

  @ManyToMany(() => Vacancy, (vacancy) => vacancy.vacancyLists)
  @JoinTable()
  vacancies: Vacancy;
}
