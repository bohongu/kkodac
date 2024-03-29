import { IsEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  authorId: string;

  files: string[];

  tags: any[];

  @IsString()
  region: string;

  @IsEmpty()
  updatedAt: string;

  @IsEmpty()
  createdAt: string;

  @IsString()
  tagString: string;
}
