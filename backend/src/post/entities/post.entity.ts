import { Like } from 'src/like/entities/like.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Entity } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { PostCommentMapper } from './post.comment.mapping.entity';
import { PostFileMapper } from './post.file.mapping.entity';
import { PostTagMapper } from './post.tag.mapping.entity';
import { Region } from './region.entity';

@Entity({ name: 'post_tb' })
export class Post {
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
    comment: 'rowId',
    unsigned: true,
  })
  _id: number;

  @Index({ unique: true })
  @Column({
    name: 'post_id',
    comment: '게시글 UUID',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  postId: string = uuidv4();

  @CreateDateColumn({
    name: 'created_at',
    comment: '생성일',
    type: 'datetime',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    comment: '수정일',
    type: 'datetime',
  })
  updatedAt: Date;

  @Column({
    name: 'title',
    type: 'varchar',
    length: 50,
    nullable: false,
    comment: '게시글 제목',
  })
  title: string;

  @Column({
    name: 'description',
    type: 'varchar',
    length: 256,
    nullable: false,
    comment: '게시글 내용',
  })
  description: string;

  @OneToMany(() => PostFileMapper, (mapper) => mapper.post)
  fileMappers: PostFileMapper[];

  @OneToMany(() => PostTagMapper, (mapper) => mapper.post)
  tagMappers: PostTagMapper[];

  @OneToMany(() => PostCommentMapper, (mapper) => mapper.post)
  commentMappers: PostCommentMapper[];

  @OneToMany(() => Like, (like) => like.post)
  likes: Like[];

  @OneToOne(() => User, (user) => user, {
    createForeignKeyConstraints: false,
    nullable: false,
  })
  @JoinColumn({
    name: 'author_id',
    referencedColumnName: 'userId',
  })
  authorId: User;

  @OneToOne(() => Region, (region) => region, {
    createForeignKeyConstraints: false,
    nullable: false,
  })
  @JoinColumn({
    name: 'region_id',
    referencedColumnName: 'regionId',
  })
  regionId: Region;

  @Column({
    name: 'tagString',
    type: 'varchar',
    length: 256,
    nullable: false,
    comment: '태그 문자열',
  })
  tagString: string;
}
