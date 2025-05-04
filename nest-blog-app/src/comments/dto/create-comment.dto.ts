import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  postId: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  ownerId: number;
}
