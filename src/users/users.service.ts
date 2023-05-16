import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import UserDto from './userDto';

export type User = any;
const prisma = new PrismaClient();

@Injectable()
export class UsersService {

  
  async findOne(username: string): Promise<User | undefined> {
    return prisma.user.findUnique({where: {username}});
  }

  async findAll(userData : UserDto[]){

  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return await prisma.user.findUnique({ where: { email: email } });
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return await prisma.user.findUnique({ where: { username: username } });
  }

  // 회원가입 서비스
  async createUser(userData: UserDto) {
    try {
      const created = await prisma.user.create({
        data: {
          username: userData.username,
          email: userData.email,
          password: userData.password,
          name: userData.name,
        },
      });
      return created;
    } catch (e: any){
      console.log('e=', e)
      if (e.code == 'P2002') {
        throw new HttpException(e.meta.target[0] + '이 중복되었습니다', HttpStatus.FORBIDDEN);
      }
    }
  }
}
