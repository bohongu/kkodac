import { IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  description: string;

  @IsString()
  authorId: string;

  @IsString()
  postId: string;
}
