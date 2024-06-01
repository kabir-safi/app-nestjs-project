import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SabreModule } from './ticketing/v1/restful/sabre/sabre.module';
import { OrdercreateModule } from './ticketing/v1/restful/ordercreate/ordercreate.module';
import { OrderchangeModule } from './ticketing/v1/restful/orderchange/orderchange.module';
import { OrderretriveModule } from './ticketing/v1/restful/orderretrive/orderretrive.module';
import { OrdercancelModule } from './ticketing/v1/restful/ordercancel/ordercancel.module';
import { OrdervoidModule } from './ticketing/v1/restful/ordervoid/ordervoid.module';
import { TravelportModule } from './ticketing/v1/restful/travelport/travelport.module';
import { MarkupModule } from './ticketing/v1/restful/markup/markup.module';
import { PaymentModule } from './ticketing/v1/restful/payment/payment.module';
import { AuthModule } from './ticketing/v1/restful/auth/auth.module';
import { MiddlewareModule } from './ticketing/v1/restful/middleware/middleware.module';
import { ExceptionsModule } from './ticketing/v1/restful/exceptions/exceptions.module';
import { OrderrareruleModule } from './ticketing/v1/restful/orderrarerule/orderrarerule.module';
import { JobsModule } from './ticketing/v1/restful/jobs/jobs.module';
import { EventsModule } from './ticketing/v1/restful/events/events.module';

@Module({
  imports: [
    SabreModule,
    OrdercreateModule,
    OrderchangeModule,
    OrderretriveModule,
    OrdercancelModule,
    OrdervoidModule,
    TravelportModule,
    MarkupModule,
    PaymentModule,
    AuthModule,
    MiddlewareModule,
    ExceptionsModule,
    OrderrareruleModule,
    JobsModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
