import { AuthGuard } from 'src/auth/auth.guard';
import { TodoService } from './todo.service';
import { Controller, UseGuards ,Get ,Post, Request, Param, Body, Delete} from '@nestjs/common';
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
    getInProgressTodoList(@Param('id') id: number) {
    // 진행 중인 TodoList 조회 로직
        console.log(id);
        return this.todoService.getUndoneTodoByUserId(id);
    }

    @Public()
    @Get('completedList/:id')
    getCompletedTodoList(@Param('id') id : number) {
    // 완료된 TodoList 조회 로직
        return this.todoService.getCompletedTodoByUserId(id);
    }

    @Public()
    @Get('pastList/:id')
    getPastTodoList(@Param('id') id: number) {
    // 지난 TodoList 조회 로직
        console.log(id);
        return this.todoService.getPastTodoByUserId(id);
    }

    @Public()
    @Post('isDoneTodo/:uid/:tid')
    isTodoSuccessfulUpdate(@Param('uid') uid: number, @Param('tid') tid: number, @Body() body: { isDone: boolean }){
    // isDone에 상태에 따라 변경 로직
        // console.log(uid);
        // console.log(tid);
        // console.log(body.isDone);
        return this.todoService.updateTodoCompletionStatus(uid, tid, body.isDone);
    }

    @Public()
    @Delete('deleteTodo/:uid/:tid')
    isTodoDelete(@Param('uid') uid: number, @Param('tid') tid: number){
        console.log(tid);
        return this.todoService.deleteTodoByTodoId(tid);
    }

}
