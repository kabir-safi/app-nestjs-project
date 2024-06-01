import { Test, TestingModule } from '@nestjs/testing';
import { OrderchangeService } from './orderchange.service';

describe('OrderchangeService', () => {
  let service: OrderchangeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderchangeService],
    }).compile();

    service = module.get<OrderchangeService>(OrderchangeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
