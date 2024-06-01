import { Test, TestingModule } from '@nestjs/testing';
import { SabreFlightItinerariesService } from './sabre-flight-itineraries.service';

describe('SabreFlightItinerariesService', () => {
  let service: SabreFlightItinerariesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SabreFlightItinerariesService],
    }).compile();

    service = module.get<SabreFlightItinerariesService>(SabreFlightItinerariesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
