import { AuthGuard } from 'src/auth/auth.guard';
import { TodoService } from './todo.service';
import { Controller, UseGuards ,Get ,Post, Request, Param, Body} from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import TodoDto from './todoDto';

@Controller('todo')
export class TodoController {
    constructor (private todoService : TodoService){}

    // @UseGuards(AuthGuard)
    @Public()
    @Post('register/:id')
    todoRegister(@Param('id') id: string, @Body() todoData : TodoDto){
        this.todoService.createTodo(todoData , id);
        console.log(id);
        console.log(todoData);
    }

    @Public()
    @Get('inProgressList/:id')
    getInProgressTodoList(@Param('id') id: string) {
    // 진행 중인 TodoList 조회 로직
        console.log(id);
        return this.todoService.getUndoneTodoByUserId(id);
    }

    @Public()
    @Get('completedList/:id')
    getCompletedTodoList(@Param('id') id: string) {
    // 완료된 TodoList 조회 로직
        return this.todoService.getCompletedTodoByUserId(id);
    }

    @Public()
    @Get('pastList/:id')
    getPastTodoList(@Param('id') id: string) {
    // 지난 TodoList 조회 로직
        return this.todoService.getPastTodoByUserId(id);
    }
}
