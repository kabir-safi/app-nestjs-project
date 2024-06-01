import { Test, TestingModule } from '@nestjs/testing';
import { OrdercancelService } from './ordercancel.service';

describe('OrdercancelService', () => {
  let service: OrdercancelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdercancelService],
    }).compile();

    service = module.get<OrdercancelService>(OrdercancelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
