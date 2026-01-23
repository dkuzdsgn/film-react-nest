import { FilmsTypeormRepository } from './repository/film.typeorm.repository';

export const databaseProvider = {
  provide: 'FilmsRepository',
  useClass: FilmsTypeormRepository,
};
