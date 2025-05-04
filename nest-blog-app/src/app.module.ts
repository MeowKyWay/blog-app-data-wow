import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { UserService } from './user/user.service';
import { PostService } from './post/post.service';
import { PostModule } from './post/post.module';

@Module({
  imports: [AuthModule, PostModule],
  controllers: [AppController, AuthController],
  providers: [AppService, PrismaService, UserService, PostService],
})
export class AppModule {}
