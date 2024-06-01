import { Module } from '@nestjs/common';
import { SabreService } from './sabre.service';
import { SabreController } from './sabre.controller';
import { SabreAuthService } from './sabre-auth/sabre-auth.service';
import { SabreDriverService } from './sabre-driver/sabre-driver.service';
import { SabreFlightItinerariesService } from './sabre-flight-itineraries/sabre-flight-itineraries.service';
import { SabrePayloadService } from './sabre-payload/sabre-payload.service';
import { DateTimeService } from './date-time/date-time.service';
import { SabreDateTimeService } from './sabre-date-time/sabre-date-time.service';

@Module({
  providers: [
    SabreService,
    SabreAuthService,
    SabreDriverService,
    SabreFlightItinerariesService,
    SabrePayloadService,
    DateTimeService,
    SabreDateTimeService,
  ],
  controllers: [SabreController]
})
export class SabreModule {}
