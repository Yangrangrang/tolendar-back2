import { User } from "@prisma/client"

export default class TodoDto {
    todoId  : number
    content : string  
    isDone : boolean
    todoDate : Date
    dayAgoAlarm : string
    veryDayAlarm : string
    userUserId : number
  }