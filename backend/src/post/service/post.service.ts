import { Inject, Injectable } from '@nestjs/common';
import { PostRepository } from '../repository/post.repository';
import { Request } from 'express';
import { CreatePostDto } from '../dto/create-post.dto';
import { FindPostDto } from '../dto/find-post.dto';

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

  async findOne(id: string) {
    const result = await this.postRepository.findOne(id);
    return result;
  }

  async findAll(tag: string[], region: string) {
    const result = await this.postRepository.findAll(tag, region);
    return result;
  }
}
