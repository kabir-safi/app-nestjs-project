import { Test, TestingModule } from '@nestjs/testing';
import { SabreAuthService } from './sabre-auth.service';

describe('SabreAuthService', () => {
  let service: SabreAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SabreAuthService],
    }).compile();

    service = module.get<SabreAuthService>(SabreAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
