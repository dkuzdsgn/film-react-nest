import { Inject, Injectable } from '@nestjs/common';
import { FilmsRepository } from '../repository/film.repository';

@Injectable()
export class FilmsService {
  constructor(
    @Inject('FilmsRepository')
    private readonly filmsRepository: FilmsRepository,
  ) {}

  async getFilms() {
    return this.filmsRepository.findAll();
  }

  async getSchedule(filmId: string) {
    return this.filmsRepository.findSchedulesByFilmId(filmId);
  }
}
