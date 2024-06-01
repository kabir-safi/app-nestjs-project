import { Test, TestingModule } from '@nestjs/testing';
import { OrderretriveController } from './orderretrive.controller';

describe('OrderretriveController', () => {
  let controller: OrderretriveController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderretriveController],
    }).compile();

    controller = module.get<OrderretriveController>(OrderretriveController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
