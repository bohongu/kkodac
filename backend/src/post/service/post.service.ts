import { Inject, Injectable } from '@nestjs/common';
import { PostRepository } from '../repository/post.repository';
import { Request } from 'express';
import { CreatePostDto } from '../dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(
    @Inject(PostRepository)
    private readonly postRepository: PostRepository,
  ) {}

  async create(createPostDto: CreatePostDto, req: Request) {
    const result = await this.postRepository.create(createPostDto, req);

    return result;
  }

  async findAll(searchWord: string) {
    const result = await this.postRepository.findAll(searchWord);
    return result;
  }
}
