import { Inject, Injectable } from '@nestjs/common';
import { PostRepository } from '../repository/post.repository';
import { Request } from 'express';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';

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

  async delete(id: string) {
    const result = await this.postRepository.delete(id);
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

  async findUserAll(id: string) {
    const result = await this.postRepository.findUserAll(id);
    return result;
  }

  async findTag() {
    const result = await this.postRepository.findTag();
    return result;
  }

  async getUserLike(id: string) {
    const result = await this.postRepository.getUserLike(id);
    return result;
  }
}
