import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { EmailService } from 'src/email/email.service';

@Module({
  controllers: [TodoController],
  exports: [TodoService],
  providers: [TodoService, EmailService],
})
export class TodoModule {}
