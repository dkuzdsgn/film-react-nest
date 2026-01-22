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
    const film = await this.filmRepo.findOne({
      where: { id },
      relations: ['schedule'],
    });

    return (film?.schedule ?? []).sort((a, b) =>
      a.daytime.localeCompare(b.daytime),
    );
  }

  async findScheduleById(filmId: string, scheduleId: string) {
    return this.scheduleRepo.findOne({
      where: {
        id: scheduleId,
        film: { id: filmId },
      },
      relations: ['film'],
    });
  }

  async addTakenSeats(filmId: string, scheduleId: string, seats: string[]) {
    const schedule = await this.scheduleRepo.findOne({
      where: { id: scheduleId },
    });

    if (!schedule) return;

    const taken = JSON.parse(schedule.taken || '[]');
    schedule.taken = JSON.stringify([...taken, ...seats]);

    await this.scheduleRepo.save(schedule);
  }
}
