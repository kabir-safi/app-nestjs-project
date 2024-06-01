import { Test, TestingModule } from '@nestjs/testing';
import { OrderchangeController } from './orderchange.controller';

describe('OrderchangeController', () => {
  let controller: OrderchangeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderchangeController],
    }).compile();

    controller = module.get<OrderchangeController>(OrderchangeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
