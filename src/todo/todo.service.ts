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
                    userId : parseInt(userId)
                },
            });
            return created;
        } catch (e) {
            console.log(e);
        }
    }

    // todo 수정
    async updateTodoByTodoId (todoId: number, todoData : TodoDto){
        const newTodoDate = new Date(todoData.todoDate);
        let newdayAgoAlarm = "";
        let newvaryDayAlarm = "";

        if (todoData.dayAgoAlarm) {
            newdayAgoAlarm = todoData.dayAgoAlarm
        }
        if (todoData.veryDayAlarm){
            newvaryDayAlarm = todoData.veryDayAlarm;
        }

        try {
            const updated = await prisma.todo.update({
                where : {
                    id : todoId,
                },
                data: {
                    content: todoData.content,
                    todoDate : newTodoDate,
                    dayAgoAlarm : newdayAgoAlarm,
                    veryDayAlarm : newvaryDayAlarm,
                },
            })
            return updated;
        } catch (e) {
            console.log(e);
        }
    }

    // 진행중인 todoList 가져오기
    async getUndoneTodoByUserId(userId : number) {
        try {
            const currentDate = new Date(); // 현재날짜
            currentDate.setHours(0, 0, 0, 0); // 시간을 00:00:00으로 설정 (오늘날짜도 가져오고 싶어서)

            const undoneTodos = await prisma.todo.findMany({
                where: {
                    userId : userId,
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
    async getCompletedTodoByUserId(userId: number){
        console.log('getCompletedTodoByUserId', userId);
        try {
            const completeTodos = await prisma.todo.findMany({
                where: {
                    user : {
                        id : userId
                    },
                    isDone : true,
                },
                orderBy : {
                    id : 'desc'   //정렬기준 필드, 방향
                }
            });
            return completeTodos;
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    // 지난 todoList 가져오기
    async getPastTodoByUserId(id: number){
        console.log(id);
        try{
            const currentDate = new Date(); // 현재 날짜
            currentDate.setHours(0, 0, 0, 0);

            const pastTodos = await prisma.todo.findMany({
                where: {
                    userId : id,
                    isDone : false,
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

    // todo 완료 여부에 따라 데이터 수정
    async updateTodoCompletionStatus(user: number , todoId : number, updateDate : boolean){
        try {
            const updateTodo = await prisma.todo.update({
                where: {
                    id: todoId,
                },
                data: {
                    isDone: updateDate,
                },
            });
        } catch (e){
            console.error('Failed to update todo completion status:', e);
            throw e;
        }
    }

    // 특정 todo 삭제
    async deleteTodoByTodoId(todoId : number){
        try {
            const deleteTodo = await prisma.todo.delete({
                where : {
                    id : todoId
                },
            });
            console.log('Todo deleted successfully');
        } catch (e){
            console.error('deleteError', e);
            throw e;
        }
    }

    // 특정 todo 가져오기
    async getTodoByTodoId(todoId : number){
        try {
            const todo = await prisma.todo.findUnique({
                where: {
                    id : todoId
                }
            })
        return todo;
        } catch (e) {
            console.log(e);
        }
    }
}
