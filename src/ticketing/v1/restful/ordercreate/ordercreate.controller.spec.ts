import { Test, TestingModule } from '@nestjs/testing';
import { OrdercreateController } from './ordercreate.controller';

describe('OrdercreateController', () => {
  let controller: OrdercreateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdercreateController],
    }).compile();

    controller = module.get<OrdercreateController>(OrdercreateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
