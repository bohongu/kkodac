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
import { Like } from 'src/like/entities/like.entity';
import { PostCommentMapper } from '../entities/post.comment.mapping.entity';

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
    @InjectRepository(PostTagMapper)
    private readonly postTagMapperRepository: Repository<PostTagMapper>,
    @InjectRepository(PostFileMapper)
    private readonly postFileMapperRepository: Repository<PostFileMapper>,
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
    @InjectRepository(PostCommentMapper)
    private readonly postCommentMapperRepository: Repository<PostCommentMapper>,
  ) {}

  async create(createPostDto: CreatePostDto, req: Request): Promise<Post> {
    let post: Post;
    const fileIds = createPostDto.files ? createPostDto.files : [];
    const files = [];
    const tagIds = [];
    const tags = [];

    for (const i in createPostDto.tags) {
      tagIds.push(createPostDto.tags[i].data);
    }

    console.log(tagIds);
    for (const fileId of fileIds) {
      files.push(
        await this.fileRepository.findOne({
          fileId: fileId,
        }),
      );
    }

    const defaultProfile = await this.fileRepository.findOne({
      where: {
        fileId: '5df27f11-1a0f-4cec-b9b7-24b7b0447b44',
      },
    });

    for (const i in createPostDto.tags) {
      const a = await this.tagRepository.findOne({ tagId: tagIds[i] });

      if (a === undefined) {
        const entity = this.tagRepository.create({
          tagId: tagIds[i],
        });
        await this.tagRepository.save(entity);
      }
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
        await queryRunner.manager.getRepository(PostFileMapper).save(entity);
      }

      for (const tag of tags) {
        const entity = queryRunner.manager.getRepository(PostTagMapper).create({
          tag: tag,
          post: post,
        });
        const a = await queryRunner.manager
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
      .leftJoinAndSelect('post.likes', 'like')
      .leftJoinAndSelect('like.user', 'likeUser')
      .leftJoinAndSelect('likeUser.fileId', 'likeUserFileId')
      .leftJoinAndSelect('post.commentMappers', 'commentMapper')
      .leftJoinAndSelect('commentMapper.comment', 'comment')
      .leftJoinAndSelect('comment.authorId', 'commentAuthorId')
      .leftJoinAndSelect('commentAuthorId.fileId', 'commentUserfileId')
      .where({ postId: id })
      .getOne();

    delete post._id;

    for (const num in post.fileMappers) {
      delete post.fileMappers[num]._id;
      delete post.fileMappers[num].file._id;
      delete post.fileMappers[num].file.createdAt;
      delete post.fileMappers[num].file.deployName;
      delete post.fileMappers[num].file.fileName;
      delete post.fileMappers[num].file.fileId;
    }
    for (const num in post.tagMappers) {
      delete post.tagMappers[num]._id;
      delete post.tagMappers[num].tag._id;
      delete post.tagMappers[num].tag.createdAt;
    }

    for (const num in post.commentMappers) {
      delete post.commentMappers[num]._id;
      delete post.commentMappers[num].comment._id;
      delete post.commentMappers[num].comment.authorId._id;
      delete post.commentMappers[num].comment.authorId.createdAt;
      delete post.commentMappers[num].comment.authorId.googleAccount;
      delete post.commentMappers[num].comment.authorId.introduce;
      delete post.commentMappers[num].comment.authorId.kakaoAccount;
      delete post.commentMappers[num].comment.authorId.password;
      delete post.commentMappers[num].comment.authorId.refreshToken;
      delete post.commentMappers[num].comment.authorId.updatedAt;
      delete post.commentMappers[num].comment.authorId.fileId._id;
      delete post.commentMappers[num].comment.authorId.fileId.createdAt;
      delete post.commentMappers[num].comment.authorId.fileId.deployName;
      delete post.commentMappers[num].comment.authorId.fileId.fileId;
      delete post.commentMappers[num].comment.authorId.fileId.fileName;
    }

    for (const num in post.likes) {
      delete post.likes[num]._id;
      delete post.likes[num].user._id;
      delete post.likes[num].user.createdAt;
      delete post.likes[num].user.googleAccount;
      delete post.likes[num].user.updatedAt;
      delete post.likes[num].user.kakaoAccount;
      delete post.likes[num].user.introduce;
      delete post.likes[num].user.refreshToken;
      delete post.likes[num].user.password;
      delete post.likes[num].user.username;
      delete post.likes[num].user.fileId._id;
      delete post.likes[num].user.fileId.createdAt;
      delete post.likes[num].user.fileId.deployName;
      delete post.likes[num].user.fileId.fileName;
      delete post.likes[num].user.fileId.fileId;
    }

    delete post.authorId._id;
    delete post.authorId.password;
    delete post.authorId.kakaoAccount;
    delete post.authorId.googleAccount;
    delete post.authorId.refreshToken;
    delete post.authorId.introduce;
    delete post.authorId.updatedAt;
    delete post.authorId.createdAt;

    delete post.regionId._id;
    delete post.regionId.createdAt;
    delete post.regionId.regionId;
    delete post.updatedAt;

    return post;
  }

  async delete(id: string) {
    const post = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.tagMappers', 'tagmapper')
      .leftJoinAndSelect('tagmapper.tag', 'tag')
      .where({ postId: id })
      .getOne();

    for (const i in post.tagMappers) {
      const tags = await this.tagRepository
        .createQueryBuilder('tag')
        .where({ tagId: post.tagMappers[i].tag.tagId })
        .getOne();

      const tagg = await this.postTagMapperRepository.find({
        tag: tags,
      });

      if (tagg.length <= 2)
        await this.tagRepository.delete({
          tagId: tags.tagId,
        });
    }

    const postId = await this.postRepository.findOne({
      postId: id,
    });

    const result = await this.postRepository.delete({ postId: id });
    await this.postTagMapperRepository.delete({ post: postId });
    await this.postFileMapperRepository.delete({ post: postId });
    await this.likeRepository.delete({ post: postId });
    await this.postCommentMapperRepository.delete({ post: postId });
    return result;
  }

  async findAll(region?: string, tag?: string) {
    const posts = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.fileMappers', 'filemapper')
      .leftJoinAndSelect('filemapper.file', 'file')
      .leftJoinAndSelect('post.tagMappers', 'tagmapper')
      .leftJoinAndSelect('tagmapper.tag', 'tag')
      .leftJoinAndSelect('post.likes', 'like')
      .leftJoinAndSelect('like.user', 'user')
      .leftJoinAndSelect('user.fileId', 'fileId')
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

      for (const num in post.likes) {
        delete post.likes[num]._id;
        delete post.likes[num].post;
        delete post.likes[num].user.createdAt;
        delete post.likes[num].user.googleAccount;
        delete post.likes[num].user.introduce;
        delete post.likes[num].user.kakaoAccount;
        delete post.likes[num].user.likes;
        delete post.likes[num].user.password;
        delete post.likes[num].user.socialFileId;
        delete post.likes[num].user.refreshToken;
        delete post.likes[num].user.updatedAt;
        delete post.likes[num].user.username;
        delete post.likes[num].user.nickname;
        delete post.likes[num].user.fileId;
        delete post.likes[num].user._id;
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

  async findTag() {
    const tags = await this.tagRepository
      .createQueryBuilder('tag')
      .select('tag.tagId')
      .orderBy('RAND()')
      .take(15)
      .getMany();

    return tags;
  }

  async findTagAll(tag: string) {
    const posts = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.fileMappers', 'filemapper')
      .leftJoinAndSelect('filemapper.file', 'file')
      .leftJoinAndSelect('post.tagMappers', 'tagmapper')
      .leftJoinAndSelect('tagmapper.tag', 'tag')
      .leftJoinAndSelect('post.likes', 'like')
      .leftJoinAndSelect('like.user', 'user')
      .leftJoinAndSelect('post.authorId', 'authorId')
      .leftJoinAndSelect('post.regionId', 'regionId')
      .where('post.tagString like :tag', {
        tag: `%${tag ? tag : ''}%`,
      })
      .orderBy('RAND()')
      .getMany();

    for (const post of posts) {
      delete post._id;

      for (const num in post.fileMappers) {
        delete post.fileMappers[num]._id;
      }

      for (const num in post.tagMappers) {
        delete post.tagMappers[num]._id;
      }

      for (const num in post.likes) {
        delete post.likes[num]._id;
        delete post.likes[num].post;
        delete post.likes[num].user.createdAt;
        delete post.likes[num].user.googleAccount;
        delete post.likes[num].user.introduce;
        delete post.likes[num].user.kakaoAccount;
        delete post.likes[num].user.likes;
        delete post.likes[num].user.password;
        delete post.likes[num].user.socialFileId;
        delete post.likes[num].user.refreshToken;
        delete post.likes[num].user.updatedAt;
        delete post.likes[num].user.username;
        delete post.likes[num].user.nickname;
        delete post.likes[num].user.fileId;
        delete post.likes[num].user._id;
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

  async findUserAll(id: string) {
    const posts = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.fileMappers', 'filemapper')
      .leftJoinAndSelect('filemapper.file', 'file')
      .leftJoinAndSelect('post.tagMappers', 'tagmapper')
      .leftJoinAndSelect('tagmapper.tag', 'tag')
      .leftJoinAndSelect('post.likes', 'like')
      .leftJoinAndSelect('like.user', 'user')
      .leftJoinAndSelect('user.fileId', 'fileId')
      .leftJoinAndSelect('post.authorId', 'authorId')
      .leftJoinAndSelect('post.regionId', 'regionId')
      .where('post.authorId = :userId', {
        userId: id,
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

      for (const num in post.likes) {
        delete post.likes[num]._id;
        delete post.likes[num].post;
        delete post.likes[num].user.createdAt;
        delete post.likes[num].user.googleAccount;
        delete post.likes[num].user.introduce;
        delete post.likes[num].user.kakaoAccount;
        delete post.likes[num].user.likes;
        delete post.likes[num].user.password;
        delete post.likes[num].user.socialFileId;
        delete post.likes[num].user.refreshToken;
        delete post.likes[num].user.updatedAt;
        delete post.likes[num].user.username;
        delete post.likes[num].user.nickname;
        delete post.likes[num].user.fileId;
        delete post.likes[num].user._id;
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

  async findLikeListByPostId(id: string) {
    const data = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.likes', 'like')
      .leftJoinAndSelect('like.user', 'user')
      .leftJoinAndSelect('user.fileId', 'fileId')
      .select([
        'user.userId as userId',
        'user.nickname as nickname',
        'fileId.fileUrl as fileUrl',
      ])
      .where('post.postId = :postId', { postId: id })
      .execute();
    return { users: data };
  }

  async getUserLike(id: string) {
    const post = await this.likeRepository
      .createQueryBuilder('like')
      .leftJoinAndSelect('like.user', 'user')
      .leftJoinAndSelect('like.post', 'post')
      .leftJoinAndSelect('post.fileMappers', 'filemapper')
      .leftJoinAndSelect('filemapper.file', 'file')
      .leftJoinAndSelect('post.tagMappers', 'tagmapper')
      .leftJoinAndSelect('tagmapper.tag', 'tag')
      .leftJoinAndSelect('post.authorId', 'authorId')
      .leftJoinAndSelect('post.regionId', 'regionId')
      .where('user.userId = :userId', { userId: id })
      .getMany();

    for (const i in post) {
      delete post[i].user;
      delete post[i]._id;

      for (const num in post[i].post.fileMappers) {
        delete post[i].post.fileMappers[num]._id;
        delete post[i].post.fileMappers[num].file._id;
        delete post[i].post.fileMappers[num].file.createdAt;
        delete post[i].post.fileMappers[num].file.deployName;
        delete post[i].post.fileMappers[num].file.fileId;
        delete post[i].post.fileMappers[num].file.fileName;
      }

      for (const num in post[i].post.tagMappers) {
        delete post[i].post.tagMappers[num]._id;
        delete post[i].post.tagMappers[num].tag._id;
        delete post[i].post.tagMappers[num].tag.createdAt;
      }

      delete post[i].post._id;
      delete post[i].post.updatedAt;
      delete post[i].post.authorId._id;
      delete post[i].post.authorId.password;
      delete post[i].post.authorId.introduce;
      delete post[i].post.authorId.createdAt;
      delete post[i].post.authorId.updatedAt;
      delete post[i].post.authorId.kakaoAccount;
      delete post[i].post.authorId.googleAccount;
      delete post[i].post.authorId.refreshToken;
      delete post[i].post.regionId._id;
      delete post[i].post.regionId.createdAt;
      delete post[i].post.regionId.name;
    }
    return post;
  }
}
