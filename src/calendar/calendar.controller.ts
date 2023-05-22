import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import CalendarDto from './calendarDto';
import { Request, Response } from 'express';
import { CalendarService } from './calendar.service';

@Controller('calendar')
export class CalendarController {

    constructor(private calendarService : CalendarService){}

    @Public()
    @Post('register/:id')
    calendarRegister(@Param('id') userId : number, @Body() calendarData : CalendarDto){
        // calendar 등록
        console.log(calendarData);
        return this.calendarService.createCalendar(calendarData, userId);
    }

    @Public()
    @Get('getList/:id')
    allCalendarList(@Param('id') userId : number){
        // calendarList 보내기
        console.log("userId = " ,userId);
        return this.calendarService.getAllCalendarListByUserId(userId);
    }

    @Public()
    @Delete('delete/:id')
    calendarDelete(@Param('id') calendarId : number){
        console.log(calendarId);
        return this.calendarService.deleteCalendarByCalendarId(calendarId);
    }

    @Public()
    @Post('update/:id')
    calendarUpdate(@Param('id') calendarId : number, @Body() calendarData : CalendarDto ){
        console.log(calendarId);
        console.log(calendarData);
        return this.calendarService.updateCalendarByCalendarId(calendarId, calendarData);
    }

    @Public()
    @Get('getCalendar/:date')
    getCalendarList(@Param('date') calendarDate : Date){
        console.log(calendarDate);
        return this.calendarService.getCalendarByDate(calendarDate);
    }
    
}
