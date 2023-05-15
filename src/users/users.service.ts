import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import UserDto from './userDto';

export type User = any;
const prisma = new PrismaClient();

@Injectable()
export class UsersService {

  
  async findOne(username: string): Promise<User | undefined> {
    return prisma.user.findUnique({where: {username}});
    // return this.users.find(user => user.userEmail === userEmail);
  }

  async findAll(userData : UserDto[]){

  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return await prisma.user.findUnique({ where: { email: email } });
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return await prisma.user.findUnique({ where: { username: username } });
  }

  async createUser(userData: UserDto) {
    // const existingEmail = await this.findOneByEmail(userData.email);
    // if (existingEmail) {
    //   throw new HttpException('Email already exists', 409);
    // }
    
    // const existingUsername = await this.findOneByUsername(userData.username);
    // if (existingUsername) {
    //   throw new HttpException('Username already exists', 422);
    // }
    
    // try {
      const created = await prisma.user.create({
        data: {
          username: userData.username,
          email: userData.email,
          password: userData.password,
          name: userData.name,
        },
      });
      return created;
    // } catch (e: any){
    //   console.log('e=')
    //   if (e.code == 'P2002') {
    //     throw new HttpException(e.meta.target[0] + '이 중복되었쓰비', HttpStatus.FORBIDDEN);
    //   }
    // }
  }
}
