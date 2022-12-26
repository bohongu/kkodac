import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './post.entity';
import { Tag } from './tag.entity';

@Entity({ name: 'post_tag_map_tb' })
export class PostTagMapper {
  @PrimaryGeneratedColumn('increment', { comment: 'rowId' })
  _id: number;

  @ManyToOne(() => Post, (post) => post.tagMappers, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'post_id', referencedColumnName: 'postId' })
  post: Post;

  @OneToOne(() => Tag, (tag) => tag, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'tag_id', referencedColumnName: 'tagId' })
  tag: Tag;

  @CreateDateColumn({
    name: 'created_at',
    comment: '생성일',
    type: 'datetime',
    select: false,
  })
  createdAt: Date;
}
