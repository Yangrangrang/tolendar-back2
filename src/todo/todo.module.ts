import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  controllers: [TodoController],
  exports: [TodoService],
  providers: [TodoService],
})
export class TodoModule {}
