import { IsNotEmpty, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';

export class LikePostDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  postId: string;
}
