import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Film } from './film.entity';

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  daytime: string;

  @Column()
  hall: number;

  @Column()
  rows: number;

  @Column()
  seats: number;

  @Column('float')
  price: number;

  @Column('text')
  taken: string;

  @ManyToOne(() => Film, (film) => film.schedule, { onDelete: 'CASCADE' })
  film: Film;
}
