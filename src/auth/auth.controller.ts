import { Body, Controller, HttpStatus, Post, HttpCode, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService : AuthService){}

  @Public()
  // @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>){
    console.log(signInDto);
    return this.authService.Login(signInDto.username, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req){
    console.log(req.user);
    return req.user;
  }
}
