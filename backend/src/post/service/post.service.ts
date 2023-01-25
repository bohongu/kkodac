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

  async findOne(id: string) {
    const result = await this.postRepository.findOne(id);
    return result;
  }

  async findAll(region: string, tag: string) {
    const result = await this.postRepository.findAll(region, tag);
    return result;
  }

  async findTagAll(tag: string) {
    const result = await this.postRepository.findTagAll(tag);
    return result;
  }

  async findUserAll(userId: string) {
    const result = await this.postRepository.findUserAll(userId);
    return result;
  }
}
