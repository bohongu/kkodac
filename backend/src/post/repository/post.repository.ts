import { Injectable } from '@nestjs/common';
import { Post } from '../entities/post.entity';
import { Request } from 'express';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostFileMapper } from '../entities/post.file.mapping.entity';
import { PostTagMapper } from '../entities/post.tag.mapping.entity';
import { Tag } from '../entities/tag.entity';
import { File } from 'src/file/entities/file.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { getConnection, Repository } from 'typeorm';

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
  ) {}

  async create(createPostDto: CreatePostDto, req: Request): Promise<Post> {
    let post: Post;
    const fileIds = createPostDto.files ? createPostDto.files : [];
    const files = [];
    const tagIds = createPostDto.tags ? createPostDto.tags : [];
    const tags = [];

    for (const fileId of fileIds) {
      files.push(
        await this.fileRepository.findOne({
          fileId: fileId,
        }),
      );
    }

    for (const tagId of tagIds) {
      tags.push(
        await this.tagRepository.findOne({
          tagId: tagId,
        }),
      );
    }

    const queryRunner = await getConnection().createQueryRunner();

    try {
      const authorId = await this.userRepository.findOne({
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
      .leftJoinAndSelect('post.authorId', 'authorId')
      .leftJoinAndSelect('post.regionId', 'regionId')
      .where({ postId: id })
      .getOne();

    delete post._id;

    for (const num in post.fileMappers) {
      delete post.fileMappers[num]._id;
    }
    for (const num in post.tagMappers) {
      delete post.tagMappers[num]._id;
      delete post.tagMappers[num].tag._id;
      delete post.tagMappers[num].tag.createdAt;
      delete post.tagMappers[num].tag.tagId;
    }

    // delete post.authorId._id;
    delete post.authorId.password;
    // delete post.authorId.introduce;
    // delete post.authorId.createdAt;
    // delete post.authorId.updatedAt;

    delete post.regionId._id;
    delete post.regionId.createdAt;
    delete post.regionId.regionId;

    return post;
  }

  async findAll(region: string, tag: string) {
    const posts = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.fileMappers', 'filemapper')
      .leftJoinAndSelect('filemapper.file', 'file')
      .leftJoinAndSelect('post.tagMappers', 'tagmapper')
      .leftJoinAndSelect('tagmapper.tag', 'tag')
      .leftJoinAndSelect('post.authorId', 'authorId')
      .leftJoinAndSelect('post.regionId', 'regionId')
      .where('post.tagString like :tag', {
        tag: `%${tag ? tag : ''}%`,
      })
      .andWhere('post.regionId = :region', {
        region: region,
      })
      .orderBy('post.updatedAt', 'DESC')
      .getMany();

    for (const post of posts) {
      delete post._id;

      for (const num in post.fileMappers) {
        delete post.fileMappers[num]._id;
      }

      for (const num in post.tagMappers) {
        delete post.tagMappers[num]._id;
      }

      delete post.authorId._id;
      delete post.authorId.password;
      delete post.authorId.introduce;
      delete post.authorId.createdAt;
      delete post.authorId.updatedAt;
      delete post.authorId.kakaoAccount;
      delete post.authorId.googleAccount;
      delete post.authorId.refreshToken;
    }
    return posts;
  }

  async findTagAll(tag: string) {
    const posts = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.fileMappers', 'filemapper')
      .leftJoinAndSelect('filemapper.file', 'file')
      .leftJoinAndSelect('post.tagMappers', 'tagmapper')
      .leftJoinAndSelect('tagmapper.tag', 'tag')
      .leftJoinAndSelect('post.authorId', 'authorId')
      .leftJoinAndSelect('post.regionId', 'regionId')
      .where('post.tagString like :tag', {
        tag: `%${tag ? tag : ''}%`,
      })
      .orderBy('post.updatedAt', 'DESC')
      .getMany();

    for (const post of posts) {
      delete post._id;

      for (const num in post.fileMappers) {
        delete post.fileMappers[num]._id;
      }

      for (const num in post.tagMappers) {
        delete post.tagMappers[num]._id;
      }

      delete post.authorId._id;
      delete post.authorId.password;
      delete post.authorId.introduce;
      delete post.authorId.createdAt;
      delete post.authorId.updatedAt;
      delete post.authorId.kakaoAccount;
      delete post.authorId.googleAccount;
      delete post.authorId.refreshToken;
    }

    return posts;
  }
  async findUserAll(userId: string) {
    const posts = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.fileMappers', 'filemapper')
      .leftJoinAndSelect('filemapper.file', 'file')
      .leftJoinAndSelect('post.tagMappers', 'tagmapper')
      .leftJoinAndSelect('tagmapper.tag', 'tag')
      .leftJoinAndSelect('post.authorId', 'authorId')
      .leftJoinAndSelect('post.regionId', 'regionId')
      .where('post.authorId = :userId', {
        userId: userId,
      })
      .orderBy('post.updatedAt', 'DESC')
      .getMany();

    for (const post of posts) {
      delete post._id;

      for (const num in post.fileMappers) {
        delete post.fileMappers[num]._id;
      }

      for (const num in post.tagMappers) {
        delete post.tagMappers[num]._id;
      }

      delete post.authorId._id;
      delete post.authorId.password;
      delete post.authorId.introduce;
      delete post.authorId.createdAt;
      delete post.authorId.updatedAt;
      delete post.authorId.kakaoAccount;
      delete post.authorId.googleAccount;
      delete post.authorId.refreshToken;
    }

    return posts;
  }
}
