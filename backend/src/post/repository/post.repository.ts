import { Injectable } from '@nestjs/common';
import { Post } from '../entities/post.entity';
import { Request } from 'express';
import { CreatePostDto } from '../dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PostFileMapper } from '../entities/post.file.mapping.entity';
import { User } from 'src/user/entities/user.entity';
import { PostTagMapper } from '../entities/post.tag.mapping.entity';
import { Tag } from '../entities/tag.entity';
import { File } from 'src/file/entities/file.entity';

@Injectable()
export class PostRepository {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    // @InjectRepository(PostFileMapper)
    // private readonly mapperFileRepository: Repository<PostFileMapper>,
    // @InjectRepository(PostTagMapper)
    // private readonly mapperTagRepository: Repository<PostTagMapper>,
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createPostDto: CreatePostDto, req: Request): Promise<Post> {
    let post: Post;
    const fileIds = createPostDto.files ? createPostDto.files : [];
    const files = [];
    const tagIds = createPostDto.tags ? createPostDto.tags : [];
    const tags = [];

    for (const fileId of fileIds) {
      files.push(
        await this.fileRepository.findOneBy({
          fileId: fileId,
        }),
      );
    }

    for (const tagId of tagIds) {
      tags.push(
        await this.tagRepository.findOneBy({
          tagId: tagId,
        }),
      );
    }

    const queryRunner = this.dataSource.createQueryRunner();

    try {
      const authorId = await this.userRepository.findOneBy({
        userId: createPostDto.authorId,
      });
      const entity = queryRunner.manager
        .getRepository(Post)
        .create({ ...createPostDto, authorId: authorId });
      post = await queryRunner.manager.getRepository(Post).save(entity);

      for (const file of files) {
        const entity = queryRunner.manager
          .getRepository(PostFileMapper)
          .create({
            file: file,
            post: post,
          });
        const test = await queryRunner.manager
          .getRepository(PostFileMapper)
          .save(entity);
      }

      for (const tag of tags) {
        const entity = queryRunner.manager.getRepository(PostTagMapper).create({
          tag: tag,
          post: post,
        });
        const test = await queryRunner.manager
          .getRepository(PostTagMapper)
          .save(entity);
      }
    } catch (error) {
      throw new Error(error);
    }
    return post;
  }

  async findAll(searchWord?: string) {
    const posts = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.fileMappers', 'filemapper')
      .leftJoinAndSelect('filemapper.file', 'file')
      .leftJoinAndSelect('post.tagMappers', 'tagmapper')
      .leftJoinAndSelect('tagmapper.tag', 'tag')
      // .where('post.mapper.tag.name like :searchWord', {
      //   searchWord: `%${searchWord ? searchWord : ''}%`,
      // })
      .orderBy('post.updatedAt', 'DESC')
      .getMany();

    for (const post of posts) {
      delete post._id;
      for (const num in post.fileMappers) {
        delete post.fileMappers[num]._id;
        delete post.fileMappers[num].file._id;
      }
      for (const num in post.tagMappers) {
        delete post.tagMappers[num]._id;
        delete post.tagMappers[num].tag._id;
      }
    }

    return posts;
  }
}
