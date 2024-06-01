import { Test, TestingModule } from '@nestjs/testing';
import { OrderretriveService } from './orderretrive.service';

describe('OrderretriveService', () => {
  let service: OrderretriveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderretriveService],
    }).compile();

    service = module.get<OrderretriveService>(OrderretriveService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
