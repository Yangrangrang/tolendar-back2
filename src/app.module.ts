import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TodoModule } from './todo/todo.module';
import { CalendarController } from './calendar/calendar.controller';
import { CalendarService } from './calendar/calendar.service';
import { CalendarModule } from './calendar/calendar.module';
import { EmailService } from './email/email.service';
import { ScheduleModule } from '@nestjs/schedule';
import { EmailModule } from './email/email.module';

@Module({
  imports: [AuthModule, UsersModule, TodoModule, CalendarModule,ScheduleModule.forRoot(), EmailModule],
  controllers: [AppController, CalendarController],
  providers: [AppService, CalendarService, EmailService],
})
export class AppModule {}
