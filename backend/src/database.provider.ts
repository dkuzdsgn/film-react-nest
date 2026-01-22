import { FilmsMongoRepository } from './repository/film.mongo.repository';
import { FilmsTypeormRepository } from './repository/film.typeorm.repository';

export const databaseProvider = {
  provide: 'FilmsRepository',
  useClass:
    process.env.DATABASE_DRIVER === 'postgres'
      ? FilmsTypeormRepository
      : FilmsMongoRepository,
};
