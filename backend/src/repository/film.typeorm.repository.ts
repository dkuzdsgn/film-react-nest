import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from '../films/film.entity';
import { Schedule } from '../films/schedule.entity';

@Injectable()
export class FilmsTypeormRepository {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepo: Repository<Film>,

    @InjectRepository(Schedule)
    private readonly scheduleRepo: Repository<Schedule>,
  ) {}

  async findAll() {
    const films = await this.filmRepo.find();

    return films.map((film) => ({
      ...film,
      schedule: [],
    }));
  }

  async findSchedulesByFilmId(id: string) {
    const schedules = await this.scheduleRepo.find({
      where: {
        film: { id },
      },
    });

    return schedules;
  }

  async findScheduleById(filmId: string, scheduleId: string) {
    const schedule = await this.scheduleRepo.findOne({
      where: {
        id: scheduleId,
        film: { id: filmId },
      },
    });

    if (!schedule) {
      return null;
    }

    return {
      ...schedule,
      taken: schedule.taken ? JSON.parse(schedule.taken) : [],
    };
  }

  async addTakenSeats(filmId: string, scheduleId: string, seats: string[]) {
    const schedule = await this.scheduleRepo.findOne({
      where: {
        id: scheduleId,
        film: { id: filmId },
      },
    });

    if (!schedule) {
      return;
    }

    const taken: string[] = schedule.taken ? JSON.parse(schedule.taken) : [];

    schedule.taken = JSON.stringify([...taken, ...seats]);

    await this.scheduleRepo.save(schedule);
  }
}
