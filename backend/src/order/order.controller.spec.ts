import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

describe('OrderController', () => {
  let controller: OrderController;
  let service: jest.Mocked<OrderService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: {
            createOrder: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get(OrderService);
  });

  it('should create order if seat is empty', async () => {
    const dto = {
      tickets: [{ film: '1', session: '10', row: 1, seat: 5 }],
    };

    const mockResponse = {
      total: 1,
      items: [
        {
          id: crypto.randomUUID(),
          film: '1',
          session: '10',
          row: 1,
          seat: 5,
          price: 300,
        },
      ],
    };

    service.createOrder.mockResolvedValue(mockResponse);

    const result = await controller.create(dto as any);

    expect(service.createOrder).toHaveBeenCalledWith(dto);
    expect(result).toEqual(mockResponse);
  });

  it('should fail if seat is taken', async () => {
    const dto = {
      tickets: [{ film: '1', session: '10', row: 1, seat: 5 }],
    };

    service.createOrder.mockRejectedValue(
      new BadRequestException('Место уже занято'),
    );

    await expect(controller.create(dto as any)).rejects.toThrow(
      'Место уже занято',
    );

    expect(service.createOrder).toHaveBeenCalledWith(dto);
  });
});
