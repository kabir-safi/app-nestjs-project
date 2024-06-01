import { Test, TestingModule } from '@nestjs/testing';
import { OrdercancelController } from './ordercancel.controller';

describe('OrdercancelController', () => {
  let controller: OrdercancelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdercancelController],
    }).compile();

    controller = module.get<OrdercancelController>(OrdercancelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
