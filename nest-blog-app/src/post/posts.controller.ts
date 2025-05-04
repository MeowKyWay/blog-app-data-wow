import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.createPost(
      createPostDto.tag,
      createPostDto.title,
      createPostDto.content,
      createPostDto.ownerId,
    );
  }

  @Get()
  getPosts() {
    return this.postsService.getPosts();
  }

  @Get(':id')
  getPostById(@Param('id') id: string) {
    console.log(this.postsService.getPostById(Number(id)));
    return this.postsService.getPostById(Number(id));
  }

  @Patch(':id')
  updatePost(@Body() updatePostDto: UpdatePostDto, @Param('id') id: string) {
    return this.postsService.updatePost(
      Number(id),
      updatePostDto.tag,
      updatePostDto.title,
      updatePostDto.content,
    );
  }

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(Number(id));
  }
}
