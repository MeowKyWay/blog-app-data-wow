import { Injectable } from '@nestjs/common';
import { User } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(username: string): Promise<User> {
    const user = await this.prismaService.user.create({
      data: {
        username,
      },
    });
    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { username },
    });
    if (user == null) {
      throw new Error('User not found');
    }
    return user;
  }
}
