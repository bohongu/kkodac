import { Injectable } from '@nestjs/common';
import { Post } from '../entities/post.entity';
import { Request } from 'express';
import { CreatePostDto } from '../dto/create-post.dto';
import { DataSource, Repository } from 'typeorm';
import { PostFileMapper } from '../entities/post.file.mapping.entity';
import { PostTagMapper } from '../entities/post.tag.mapping.entity';
import { Tag } from '../entities/tag.entity';
import { File } from 'src/file/entities/file.entity';
import { User } from 'src/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostRepository {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
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

  async findOne(id: string) {
    const post = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.fileMappers', 'filemapper')
      .leftJoinAndSelect('filemapper.file', 'file')
      .leftJoinAndSelect('post.tagMappers', 'tagmapper')
      .leftJoinAndSelect('tagmapper.tag', 'tag')
      .where({ inquiryId: id })
      .getOne();

    return post;
  }

  async findAll(tag?: string[], region?: string) {
    const posts = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.fileMappers', 'filemapper')
      .leftJoinAndSelect('filemapper.file', 'file')
      .leftJoinAndSelect('post.tagMappers', 'tagmapper')
      .leftJoinAndSelect('tagmapper.tag', 'tag')
      .leftJoinAndSelect('post.authorId', 'authorId')
      .leftJoinAndSelect('post.regionId', 'regionId')
      .where('post.regionId = :region', {
        region: region,
      })
      .orderBy('post.updatedAt', 'DESC')
      .getMany();

    // const file = [];
    // for (const post of posts) {
    //   delete post._id;
    //   delete post.description;
    //   delete post.fileMappers;
    //   for (const file of post.fileMappers)
    //   file.push(post.fileMappers[0].file.fileId);
    // file.push(post.fileMappers[0].file.fileUrl);

    // console.log(file);
    // for (const num in post.tagMappers) {
    //   delete post.tagMappers;
    //   tag.push(post.tagMappers[num].tag.tagId);
    // }
    // }

    // console.log(file);
    // console.log(tag);
    // const result = { ...posts };

    return posts;
  }
}
