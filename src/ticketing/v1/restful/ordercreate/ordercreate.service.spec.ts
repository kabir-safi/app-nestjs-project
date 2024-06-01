import { Test, TestingModule } from '@nestjs/testing';
import { OrdercreateService } from './ordercreate.service';

describe('OrdercreateService', () => {
  let service: OrdercreateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdercreateService],
    }).compile();

    service = module.get<OrdercreateService>(OrdercreateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
