import { Module } from '@nestjs/common';
import { OrderrareruleService } from './orderrarerule.service';
import { OrderrareruleController } from './orderrarerule.controller';

@Module({
  providers: [OrderrareruleService],
  controllers: [OrderrareruleController]
})
export class OrderrareruleModule {}
