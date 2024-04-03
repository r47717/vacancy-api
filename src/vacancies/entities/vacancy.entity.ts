import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ default: true })
  isActive: boolean;
}
