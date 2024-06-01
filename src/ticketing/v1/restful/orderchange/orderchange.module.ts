import { Module } from '@nestjs/common';
import { OrderchangeController } from './orderchange.controller';
import { OrderchangeService } from './orderchange.service';

@Module({
  controllers: [OrderchangeController],
  providers: [OrderchangeService]
})
export class OrderchangeModule {}
