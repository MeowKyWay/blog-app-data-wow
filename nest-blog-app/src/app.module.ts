import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { UserService } from './user/user.service';
import { PostsService } from './post/posts.service';
import { PostsModule } from './post/posts.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [AuthModule, PostsModule, CommentModule],
  controllers: [AppController, AuthController],
  providers: [AppService, PrismaService, UserService, PostsService],
})
export class AppModule {}
