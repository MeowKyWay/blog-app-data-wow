import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [AuthService, UserService, PrismaService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
