import { Injectable } from '@nestjs/common';
import { User } from 'generated/prisma';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signIn(username: string): Promise<User> {
    try {
      return await this.userService.findByUsername(username);
    } catch (error) {
      if (error.message === 'User not found') {
        // User not found, create a new user
        return await this.userService.createUser(username);
      }
      throw error; // Rethrow the error if it's not a user not found error
    }
  }
}
