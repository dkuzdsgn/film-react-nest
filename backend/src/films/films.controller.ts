import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) { }

  @Get()
  async getFilms() {
    const films = await this.filmsService.getFilms();

    return {
      total: films.length,
      items: films,
    };
  }

  @Get(':id/schedule')
  async getSchedule(@Param('id') id: string) {
    const schedule = await this.filmsService.getSchedule(id);

    return {
      total: schedule.length,
      items: schedule,
    };
  }
}
