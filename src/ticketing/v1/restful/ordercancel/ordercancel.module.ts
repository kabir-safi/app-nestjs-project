import { Module } from '@nestjs/common';
import { OrdercancelController } from './ordercancel.controller';
import { OrdercancelService } from './ordercancel.service';

@Module({
  controllers: [OrdercancelController],
  providers: [OrdercancelService]
})
export class OrdercancelModule {}
