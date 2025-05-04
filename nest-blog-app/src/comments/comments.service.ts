import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createComment(content: string, postId: number, ownerId: number) {
    const comment = await this.prismaService.comment.create({
      data: {
        content,
        postId,
        ownerId,
      },
      include: {
        owner: {
          select: {
            username: true,
          },
        },
      },
    });
    return comment;
  }
}
