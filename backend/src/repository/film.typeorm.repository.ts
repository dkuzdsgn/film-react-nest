import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Film } from '../films/film.entity';
import { Schedule } from '../films/schedule.entity';

@Injectable()
export class FilmsTypeormRepository {
  constructor(private readonly dataSource: DataSource) {}

  private get filmRepo() {
    return this.dataSource.getRepository(Film);
  }

  private get scheduleRepo() {
    return this.dataSource.getRepository(Schedule);
  }

  async findAll() {
    const films = await this.filmRepo.find();

    return films.map((film) => ({
      id: film.id,
      rating: film.rating,
      director: film.director,
      tags: film.tags ? film.tags.split(',').map((t) => t.trim()) : [],
      image: film.image,
      cover: film.cover,
      title: film.title,
      about: film.about ?? '',
      description: film.description ?? '',
      schedule: [],
    }));
  }

  async findSchedulesByFilmId(id: string) {
    const schedules = await this.scheduleRepo.find({
      where: { film: { id } },
      order: { daytime: 'ASC' },
    });

    return schedules.map((s) => ({
      id: s.id,
      daytime: s.daytime,
      hall: s.hall,
      rows: s.rows,
      seats: s.seats,
      price: s.price,
      taken: s.taken ? s.taken.split(',').filter(Boolean) : [],
    }));
  }

  async findScheduleById(filmId: string, scheduleId: string) {
    const schedule = await this.scheduleRepo.findOne({
      where: { id: scheduleId, film: { id: filmId } },
    });

    if (!schedule) return null;

    return {
      id: schedule.id,
      daytime: schedule.daytime,
      hall: schedule.hall,
      rows: schedule.rows,
      seats: schedule.seats,
      price: schedule.price,
      taken: schedule.taken ? schedule.taken.split(',').filter(Boolean) : [],
    };
  }

  async addTakenSeats(filmId: string, scheduleId: string, seats: string[]) {
    const schedule = await this.scheduleRepo.findOne({
      where: { id: scheduleId, film: { id: filmId } },
    });

    if (!schedule) return;

    const current = schedule.taken
      ? schedule.taken.split(',').filter(Boolean)
      : [];

    schedule.taken = [...current, ...seats].join(',');

    await this.scheduleRepo.save(schedule);
  }
}
