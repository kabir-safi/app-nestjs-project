import { Test, TestingModule } from '@nestjs/testing';
import { SabreService } from './sabre.service';

describe('SabreService', () => {
  let service: SabreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SabreService],
    }).compile();

    service = module.get<SabreService>(SabreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
