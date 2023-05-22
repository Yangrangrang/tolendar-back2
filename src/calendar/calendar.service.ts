import { Injectable } from '@nestjs/common';
import CalendarDto from './calendarDto';
import { CustomError } from 'src/shared/errors/CustomError';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class CalendarService {
    
    // calendar 등록
    async createCalendar(data: CalendarDto, id : number) {
        console.log(data.end);
        const newStartDate = new Date(data.start);
        const newEndDate = new Date(data.end);
        console.log(newEndDate);

        try {
            const created = await prisma.calendar.create({
                data: {
                    title : data.title,
                    start : newStartDate,
                    end : newEndDate,
                    backgroundColor : data.backgroundColor,
                    textColor : data.textColor,
                    userId : id,
                }
            })
            return created;
        } catch (e){
            console.log(e);
        }
        
    }

    // calendarList data 초기 렌더링
    async getAllCalendarListByUserId (id: number){
        try {
            const allCalendarList = await prisma.calendar.findMany({
                where: {
                    userId : id,
                }
            })
            return allCalendarList;
        } catch (e){
            console.log(e);
            return [];
        }
    }

    // calendar 삭제
    async deleteCalendarByCalendarId (calendarId : number){
        try {
            const deleteCalendar = await prisma.calendar.delete({
                where : {
                    id : calendarId
                },
            });
        } catch (e){
            console.log(e);
        }
    }

    // calendar 수정
    async updateCalendarByCalendarId ( calendarId : number , data : CalendarDto){
        const newStartDate = new Date(data.start);
        const newEndDate = new Date(data.end);
        try {
            const updateCalendar = await prisma.calendar.update({
                where: {
                    id : calendarId
                },
                data : {
                    title : data.title,
                    start : newStartDate,
                    end : newEndDate,
                    backgroundColor : data.backgroundColor,
                    textColor : data.textColor,
                }, 
            })
            return updateCalendar;
        } catch (e){
            console.log(e);
        }
    }

    // calendar list
    async getCalendarByDate (calendarDate: Date){

        try {
            // const endDate = new Date(calendarDate.setDate())
            // console.log(" end ",endDate);
            // const startDate = new Date(calendarDate);
            // const endDate = new Date(calendarDate);
            // endDate.setHours(23, 59, 59, 999); // 종료일을 23:59:59.999로 설정

            const getCalendarList = await prisma.calendar.findMany({
                where: {
                    start: calendarDate,
                },
            })
            return getCalendarList;
        } catch (e){
            console.log(e);
        }
    }

}
