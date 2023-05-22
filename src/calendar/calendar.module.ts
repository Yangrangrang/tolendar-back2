import { Module } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CalendarController } from './calendar.controller';

@Module({
    controllers : [CalendarController],
    exports : [CalendarService],
    providers : [CalendarService],
})
export class CalendarModule {}
