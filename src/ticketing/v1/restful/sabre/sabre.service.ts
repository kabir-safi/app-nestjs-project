import { Injectable } from '@nestjs/common';
import { SabreFlightItinerariesService } from './sabre-flight-itineraries/sabre-flight-itineraries.service';

@Injectable()
export class SabreService {
  constructor(
    private readonly sabreFlightItinerariesService: SabreFlightItinerariesService,
  ) {}
  async bargainFinderMaxResponse(request): Promise<any> {
    try {
      return await this.sabreFlightItinerariesService.bargainFinderMaxResponse(
        request.body,
      );
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}
