import { Test, TestingModule } from '@nestjs/testing';
import { SabreDriverService } from './sabre-driver.service';

describe('SabreDriverService', () => {
  let service: SabreDriverService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SabreDriverService],
    }).compile();

    service = module.get<SabreDriverService>(SabreDriverService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
