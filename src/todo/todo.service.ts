import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import TodoDto from './todoDto';

export type Todo = any;
const prisma = new PrismaClient();

@Injectable()
export class TodoService {

    // todo 등록
    async createTodo(todoData : TodoDto , userId : string){
        const newTodoDate = new Date(todoData.todoDate);

        try {
            const created = await prisma.todo.create({
                data: {
                    content: todoData.content,
                    todoDate : newTodoDate,
                    dayAgoAlarm : todoData.dayAgoAlarm,
                    veryDayAlarm : todoData.veryDayAlarm,
                    userUserId : parseInt(userId)
                },
            });
            return created;
        } catch (e) {
            console.log(e);
        }
    }

}
