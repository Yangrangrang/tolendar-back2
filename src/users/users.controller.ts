import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import UserDto from './userDto';
import { Public } from 'src/auth/decorators/public.decorator';



@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) {}

  @Public()
  @Post('register')
  register(@Body() userData: UserDto): Promise<UserDto> {
    console.log(userData);
    return this.usersService.createUser(userData);
  }
}
