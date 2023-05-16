import { AuthGuard } from 'src/auth/auth.guard';
import { TodoService } from './todo.service';
import { Controller, UseGuards ,Post, Request, Param, Body} from '@nestjs/common';
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
}
