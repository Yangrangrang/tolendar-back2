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
  
  async Login(userId: string , pass: string): Promise<any> {
    // 유저의 아이디와 비밀번호를 인자로 받아서 아이디에 해당하는 유저를 데이터 베이스에서 찾음.
    const user = await this.userService.findOne(userId);

    // 유저의 비밀번호를 비교
    if(user?.password !== pass){
      throw new UnauthorizedException();
    }

    // 해당 유저의 아이디를 sub 값으로 갖는 JWT(access_token)을 반환
    const payload = {sub : user.id , aud: user.name};
    return {
      access_token: await this.jwtService.signAsync(payload)
    };
  }
}
