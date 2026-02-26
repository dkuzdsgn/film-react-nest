import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let controller: FilmsController;

  const mockFilms = [
    { id: '1', title: 'Film 1' },
    { id: '2', title: 'Film 2' },
  ];

  const mockSchedule = [{ time: '18:00' }, { time: '21:00' }];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
    })
      .useMocker((token) => {
        if (token === FilmsService) {
          return {
            getFilms: jest.fn().mockResolvedValue(mockFilms),
            getSchedule: jest.fn().mockResolvedValue(mockSchedule),
          };
        }
      })
      .compile();

    controller = module.get<FilmsController>(FilmsController);
  });

  it('should find all films', async () => {
    const result = await controller.getFilms();

    expect(result).toEqual({
      total: 2,
      items: mockFilms,
    });
  });

  it('should find one schedule', async () => {
    const result = await controller.getSchedule('1');

    expect(result).toEqual({
      total: 2,
      items: mockSchedule,
    });
  });
});
