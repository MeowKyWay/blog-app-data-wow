import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [PostsService, PrismaService],
  controllers: [PostsController],
})
export class PostsModule {}
