import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postService.createPost(
      createPostDto.tag,
      createPostDto.title,
      createPostDto.content,
      createPostDto.ownerId,
    );
  }

  @Get()
  getPosts() {
    return this.postService.getPosts();
  }

  @Get(':id')
  getPostById(@Param('id') id: string) {
    console.log(this.postService.getPostById(Number(id)));
    return this.postService.getPostById(Number(id));
  }

  @Patch(':id')
  updatePost(@Body() updatePostDto: UpdatePostDto, @Param('id') id: string) {
    return this.postService.updatePost(
      Number(id),
      updatePostDto.tag,
      updatePostDto.title,
      updatePostDto.content,
    );
  }

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postService.deletePost(Number(id));
  }
}
