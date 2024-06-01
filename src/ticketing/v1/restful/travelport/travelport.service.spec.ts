import { Test, TestingModule } from '@nestjs/testing';
import { TravelportService } from './travelport.service';

describe('TravelportService', () => {
  let service: TravelportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TravelportService],
    }).compile();

    service = module.get<TravelportService>(TravelportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
