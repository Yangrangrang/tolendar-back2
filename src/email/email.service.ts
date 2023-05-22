import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaClient } from '@prisma/client';
import { TodoService } from 'src/todo/todo.service';
import * as nodemailer from 'nodemailer';
import dayjs from 'dayjs';

const prisma = new PrismaClient();

@Injectable()
export class EmailService {
    constructor(private todoService : TodoService){}

    @Cron('0 0 0 * * *')
    // test 10 * * * * *
    // 0 0 0 * * 1-7 매일 오전 12시 실행
    async handleCron(){
        console.log("test");
        // 현재 날짜의 오전 12시를 구함
        const currentDate = new Date();
        console.log("currentDate", currentDate)
        const newDate = currentDate.toISOString().split('T')[0];
        console.log("newDate", newDate);
        const repDate = new Date(newDate);
        console.log("repDate", repDate);

        // todo 데이터에서 dayAgoAlarm과 veryDayAlarm이 'on'인 항목을 가져옴
        const todos = await this.todoService.getTodosWithAlarms(repDate);
        // console.log("todos",todos);
        
        // 'on'인 알람이 있는 사용자에게 이메일 보내기
        for (const todo of todos) {
            // console.log("todo",todo);
            if (todo.veryDayAlarm === 'on') {
            // 해당 사용자에게 이메일 보내는 로직 구현
            console.log(todo.user.email);
            await this.sendEmailToUser(todo.user.email, todo.content);
            }
        }
    }

    getPreviousDayAlarmDate(date) {
        const previousDay = dayjs(date).subtract(1, 'day');
        return previousDay.format('YYYY-MM-DD');
    }
    
    @Cron('0 0 0 * * *')
    async previousDayCron (){
        // 전날 날짜 구함
        const today = new Date();
        // const previousDay = new Date(this.getPreviousDayAlarmDate(today));
        // console.log(previousDay);

        const previousDayTodos = await this.todoService.getPreviousDayAlarm(today);
        console.log(previousDayTodos);

        for (const todo of previousDayTodos){
            if (todo.dayAgoAlarm === 'on'){
                console.log("dayAgoAlarm",todo.user.email);
                await this.sendEmailToUser(todo.user.email, todo.content);
            }
        }
    }

    // 이메일 보내는 로직
    private async sendEmailToUser (userEmail : string, data: string){
        const transporter = nodemailer.createTransport({
            service: 'Naver',
            host: 'smtp.naver.com',
            port: 587,
            auth: {
                user: process.env.NAVER_ID, // 네이버 아이디
                pass: process.env.NAVER_PW, // 네이버 비밀번호 
            },
            });
            
            const mailOptions = {
                from: 'gkssk2309@naver.com',
                to: userEmail,
                subject: '알람 이메일',
                text: data,
            };
            console.log("process.env.NAVER_ID", process.env.NAVER_ID);
            console.log("process.env.NAVER_PW",process.env.NAVER_PW);

            await transporter.sendMail(mailOptions);
    }
}
