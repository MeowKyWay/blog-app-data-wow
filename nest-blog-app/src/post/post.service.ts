import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

const postSelect = Prisma.validator<Prisma.PostSelect>()({
  id: true,
  title: true,
  content: true,
  tag: true,
  ownerId: true,
  createdAt: true,
  updatedAt: true,
});

const commentSelect = Prisma.validator<Prisma.CommentSelect>()({
  id: true,
  content: true,
  createdAt: true,
  updatedAt: true,
  ownerId: true,
});

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
      include: {
        owner: {
          select: {
            username: true,
          }
        }
      }
    });
    return post;
  }

  async getPosts() {
    const posts = await this.prismaService.post.findMany({
      select: {
        ...postSelect,
        owner: {
          select: {
            username: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    return posts.map((post) => ({
      ...post,
      commentsCount: post._count.comments,
    }));
  }

  async getPostById(id: number) {
    const post = await this.prismaService.post.findUnique({
      where: { id },
      select: {
        ...postSelect,
        owner: {
          select: {
            username: true,
          },
        },
        comments: {
          select: {
            ...commentSelect,
            owner: {
              select: {
                username: true,
              },
            },
          },
        },
      },
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
