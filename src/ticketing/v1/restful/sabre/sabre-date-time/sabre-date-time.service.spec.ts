import { Test, TestingModule } from '@nestjs/testing';
import { SabreDateTimeService } from './sabre-date-time.service';

describe('SabreDateTimeService', () => {
  let service: SabreDateTimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SabreDateTimeService],
    }).compile();

    service = module.get<SabreDateTimeService>(SabreDateTimeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
