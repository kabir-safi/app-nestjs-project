import { Module } from '@nestjs/common';
import { MarkupService } from './markup.service';
import { MarkupController } from './markup.controller';

@Module({
  providers: [MarkupService],
  controllers: [MarkupController]
})
export class MarkupModule {}
