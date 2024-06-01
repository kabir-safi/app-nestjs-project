import { Module } from '@nestjs/common';
import { TravelportController } from './travelport.controller';
import { TravelportService } from './travelport.service';

@Module({
  controllers: [TravelportController],
  providers: [TravelportService]
})
export class TravelportModule {}
