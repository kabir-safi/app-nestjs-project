import { Test, TestingModule } from '@nestjs/testing';
import { OrdervoidController } from './ordervoid.controller';

describe('OrdervoidController', () => {
  let controller: OrdervoidController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdervoidController],
    }).compile();

    controller = module.get<OrdervoidController>(OrdervoidController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
