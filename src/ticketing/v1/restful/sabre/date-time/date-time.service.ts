import { Injectable } from '@nestjs/common';
import * as moment from 'moment';

@Injectable()
export class DateTimeService {
  currentDateTime(): string {
    return moment().format();
  }

  formatDateTime(dateTime: string, format: string): string {
    return moment(dateTime).format(format);
  }

  addDays(dateTime: string, days: number): string {
    return moment(dateTime).add(days, 'days').format();
  }
}
