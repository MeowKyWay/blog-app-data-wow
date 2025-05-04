import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  tag: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  ownerId: number;
}
