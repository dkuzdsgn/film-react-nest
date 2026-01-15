import { Inject } from '@nestjs/common';
import { Mongoose } from 'mongoose';
import { FilmModel } from '../films/film.model';

export class FilmsMongoRepository {
  constructor(
    @Inject('DATABASE')
    private readonly connection: Mongoose,
  ) {}

  async findAll() {
    const items = await FilmModel.find({});
    return items;
  }

  async findSchedulesByFilmId(id: string) {
    const film = await FilmModel.findOne({ id }).lean();
    return film?.schedule ?? [];
  }

  async findScheduleById(filmId: string, scheduleId: string) {
    const film = await FilmModel.findOne(
      { id: filmId, 'schedule.id': scheduleId },
      { 'schedule.$': 1 },
    ).lean();

    return film?.schedule?.[0];
  }

  async addTakenSeats(filmId: string, scheduleId: string, seats: string[]) {
    await FilmModel.updateOne(
      {
        id: filmId,
        'schedule.id': scheduleId,
      },
      {
        $push: {
          'schedule.$.taken': { $each: seats },
        },
      },
    );
  }
}
