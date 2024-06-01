import { Test, TestingModule } from '@nestjs/testing';
import { OrderrareruleService } from './orderrarerule.service';

describe('OrderrareruleService', () => {
  let service: OrderrareruleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderrareruleService],
    }).compile();

    service = module.get<OrderrareruleService>(OrderrareruleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
