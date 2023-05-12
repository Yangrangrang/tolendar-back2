import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      userEmail: 'john',
      userPassword: 'changeme',
    },
    {
      userId: 2,
      userEmail: 'maria',
      userPassword: 'guess',
    },
  ];

  async findOne(userEmail: string): Promise<User | undefined> {
    return this.users.find(user => user.userEmail === userEmail);
  }
}
