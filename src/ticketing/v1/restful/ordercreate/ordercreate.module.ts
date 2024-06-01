import { Module } from '@nestjs/common';
import { OrdercreateController } from './ordercreate.controller';
import { OrdercreateService } from './ordercreate.service';

@Module({
  controllers: [OrdercreateController],
  providers: [OrdercreateService]
})
export class OrdercreateModule {}
