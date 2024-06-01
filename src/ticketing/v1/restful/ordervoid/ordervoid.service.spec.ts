import { Test, TestingModule } from '@nestjs/testing';
import { OrdervoidService } from './ordervoid.service';

describe('OrdervoidService', () => {
  let service: OrdervoidService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdervoidService],
    }).compile();

    service = module.get<OrdervoidService>(OrdervoidService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
