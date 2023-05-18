import { User } from "@prisma/client"

export default class TodoDto {
    id  : number
    content : string  
    isDone : boolean
    todoDate : Date
    dayAgoAlarm : string
    veryDayAlarm : string
    userId : number
  }