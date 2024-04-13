import { Vacancy } from 'src/vacancies/entities/vacancy.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeUpdate,
} from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  url: string;

  @Column()
  rating: string;

  @Column({ default: false })
  isStartup: boolean;

  @Column()
  comment: string;

  @Column({ default: '' })
  hhId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updated = new Date();
  }

  @OneToMany(() => Vacancy, (vacancy) => vacancy.company, {
    cascade: true,
  })
  vacancies: Vacancy[];
}
