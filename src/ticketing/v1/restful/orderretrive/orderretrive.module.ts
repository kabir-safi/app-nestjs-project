import { Module } from '@nestjs/common';
import { OrderretriveController } from './orderretrive.controller';
import { OrderretriveService } from './orderretrive.service';

@Module({
  controllers: [OrderretriveController],
  providers: [OrderretriveService]
})
export class OrderretriveModule {}
