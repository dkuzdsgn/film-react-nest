import { Injectable } from '@nestjs/common';
import { FilmsMongoRepository } from '../repository/film.mongo.repository';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsMongoRepository) {}

  async getFilms() {
    return this.filmsRepository.findAll();
  }

  async getSchedule(filmId: string) {
    return this.filmsRepository.findSchedulesByFilmId(filmId);
  }
}
