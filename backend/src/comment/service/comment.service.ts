import { Inject, Injectable } from '@nestjs/common';
import { CreateCommentDto } from '../dto/comment.dto';
import { CommentRepository } from '../repository/comment.repository';

@Injectable()
export class CommentService {
  constructor(
    @Inject(CommentRepository)
    private readonly commentRepository: CommentRepository,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const result = await this.commentRepository.create(createCommentDto);

    return result;
  }

  async delete(id: string) {
    const result = await this.commentRepository.delete(id);
    return result;
  }
}
