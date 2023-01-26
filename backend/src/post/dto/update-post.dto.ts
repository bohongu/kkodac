import { IsEmpty, IsString } from 'class-validator';

export class UpdatePostDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  files: string[];

  tags: string[];

  @IsString()
  region: string;

  @IsEmpty()
  updatedAt: string;

  @IsString()
  tagString: string;
}
