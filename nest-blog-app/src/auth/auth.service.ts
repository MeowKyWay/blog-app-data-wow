import { Injectable } from '@nestjs/common';
import { User } from 'generated/prisma';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signIn(username: string): Promise<User> {
    try {
      const user = await this.userService.findByUsername(username);
      console.log("[AuthService] Signed in:", username);
      return user;
    } catch (error) {
      if (error.message === 'User not found') {
        // User not found, create a new user
        const user = await this.userService.createUser(username);
        console.log("[AuthService] Signed up:", username);
        return user;
      }
      throw error; // Rethrow the error if it's not a user not found error
    }
  }
}
