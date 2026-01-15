import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'node:path';
import { FilmsController } from './films/films.controller';
import { OrderController } from './order/order.controller';
import { FilmsService } from './films/films.service';
import { OrderService } from './order/order.service';
import { configProvider } from './app.config.provider';
import { databaseProvider } from './database.provider';
import { FilmsMongoRepository } from './repository/film.mongo.repository';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(process.cwd(), 'public/content/afisha'),
      serveRoot: '/content/afisha',
    }),
  ],
  controllers: [FilmsController, OrderController],
  providers: [
    configProvider,
    databaseProvider,
    FilmsMongoRepository,
    FilmsService,
    OrderService,
  ],
})
export class AppModule { }
