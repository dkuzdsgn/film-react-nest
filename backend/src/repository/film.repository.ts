import { FilmDto, GetScheduleDto, ScheduleDto } from '../films/dto/films.dto';

export interface FilmsRepository {
  findAll(): Promise<FilmDto[]>;

  findSchedulesByFilmId(filmId: string): Promise<GetScheduleDto[]>;

  findScheduleById(
    filmId: string,
    scheduleId: string,
  ): Promise<ScheduleDto | null>;

  addTakenSeats(
    filmId: string,
    scheduleId: string,
    seats: string[],
  ): Promise<void>;
}
