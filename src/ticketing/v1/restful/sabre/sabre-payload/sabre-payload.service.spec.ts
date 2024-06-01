import { Test, TestingModule } from '@nestjs/testing';
import { SabrePayloadService } from './sabre-payload.service';

describe('SabrePayloadService', () => {
  let service: SabrePayloadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SabrePayloadService],
    }).compile();

    service = module.get<SabrePayloadService>(SabrePayloadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
