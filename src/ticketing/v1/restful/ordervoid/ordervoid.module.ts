import { Module } from '@nestjs/common';
import { OrdervoidService } from './ordervoid.service';
import { OrdervoidController } from './ordervoid.controller';

@Module({
  providers: [OrdervoidService],
  controllers: [OrdervoidController]
})
export class OrdervoidModule {}
