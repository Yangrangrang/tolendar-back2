import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

// 인증논리 구현
@Injectable()
export class AuthService {
  constructor(
    private userService : UsersService,
    private jwtService : JwtService
    ){}
  
  async Login(username: string , pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if(user?.password !== pass){
      throw new UnauthorizedException();
    }
    const payload = {sub : user.userId};
    return {
      access_token: await this.jwtService.signAsync(payload)
    };
  }
}
