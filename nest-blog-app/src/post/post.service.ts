import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async createPost(
    tag: string,
    title: string,
    content: string,
    ownerId: number,
  ) {
    const post = await this.prismaService.post.create({
      data: {
        tag,
        title,
        content,
        ownerId,
      },
    });
    return post;
  }

  async getPosts() {
    const posts = await this.prismaService.post.findMany();
    return posts;
  }

  async getPostById(id: number) {
    const post = await this.prismaService.post.findUnique({
      where: { id },
    });
    if (post == null) {
      throw new Error('Post not found');
    }
    return post;
  }

  async updatePost(id: number, tag?: string, title?: string, content?: string) {
    const data: any = {};
    if (tag !== undefined) data.tag = tag;
    if (title !== undefined) data.title = title;
    if (content !== undefined) data.content = content;

    const post = await this.prismaService.post.update({
      where: { id },
      data,
    });

    return post;
  }

  async deletePost(id: number) {
    const post = await this.prismaService.post.delete({
      where: { id },
    });
    return post;
  }
}
