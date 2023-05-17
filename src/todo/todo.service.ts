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

    // 진행중인 todoList 가져오기
    async getUndoneTodoByUserId(userId : string) {
        try {
            const currentDate = new Date(); // 현재날짜
            currentDate.setHours(0, 0, 0, 0); // 시간을 00:00:00으로 설정 (오늘날짜도 가져오고 싶어서)

            const undoneTodos = await prisma.todo.findMany({
                where: {
                    userUserId : parseInt(userId),
                    isDone : false,
                    todoDate : {
                        gte : currentDate,
                    }
                }
            });
            // console.log(undoneTodos);
            return undoneTodos;
        } catch (e){
            console.log(e);
            return [];
        }
    }

    // 완료된 todoList 가져오기
    async getCompletedTodoByUserId(userId : string){
        try {
            const completeTodos = await prisma.todo.findMany({
                where: {
                    userUserId : parseInt(userId),
                    isDone : true,
                }
            });
            return completeTodos;
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    // 지난 todoList 가져오기
    async getPastTodoByUserId(userId: string){
        try{
            const currentDate = new Date(); // 현재 날짜

            const pastTodos = await prisma.todo.findMany({
                where: {
                    userUserId : parseInt(userId),
                    todoDate : {
                        lt : currentDate,
                    },
                },
            });
            return pastTodos
        } catch (e){
            console.log(e);
            return [];
        }
    }
}
