import * as crypto from 'crypto';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateOrderDto } from './dto/order.dto';
import { FilmsMongoRepository } from '../repository/film.mongo.repository';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsMongoRepository) { }

  async createOrder(dto: CreateOrderDto) {
    const { tickets } = dto;

    if (!tickets.length) {
      throw new BadRequestException('Нет билетов');
    }

    const filmId = tickets[0].film;
    const scheduleId = tickets[0].session;

    const seats = tickets.map((t) => `${t.row}:${t.seat}`);

    const schedule = await this.filmsRepository.findScheduleById(
      filmId,
      scheduleId,
    );

    if (!schedule) {
      throw new BadRequestException('Сеанс не найден');
    }

    const taken = schedule.taken ?? [];

    const conflict = seats.find((s) => taken.includes(s));
    if (conflict) {
      throw new BadRequestException(`Место ${conflict} уже занято`);
    }

    await this.filmsRepository.addTakenSeats(filmId, scheduleId, seats);

    return {
      total: tickets.length,
      items: tickets.map((ticket) => ({
        ...ticket,
        id: crypto.randomUUID(),
      })),
    };
  }
}
