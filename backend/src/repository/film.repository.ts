import { FilmDto, GetScheduleDto } from '../films/dto/films.dto';

export interface FilmsRepository {
  findAll(): Promise<FilmDto[]>;
  findSchedule(id: string): Promise<GetScheduleDto>;
}
