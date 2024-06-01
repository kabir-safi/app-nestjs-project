import { Test, TestingModule } from '@nestjs/testing';
import { OrderrareruleController } from './orderrarerule.controller';

describe('OrderrareruleController', () => {
  let controller: OrderrareruleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderrareruleController],
    }).compile();

    controller = module.get<OrderrareruleController>(OrderrareruleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
