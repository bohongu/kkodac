import { Comment } from 'src/comment/entities/comment.entity';
import { File } from 'src/file/entities/file.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './post.entity';

@Entity({ name: 'post_comment_map_tb' })
export class PostCommentMapper {
  @PrimaryGeneratedColumn('increment', { comment: 'rowId' })
  _id: number;

  @ManyToOne(() => Post, (post) => post.fileMappers, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'post_id', referencedColumnName: 'postId' })
  post: Post;

  @OneToOne(() => Comment, (comment) => comment, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'comment_id', referencedColumnName: 'commentId' })
  comment: Comment;

  @CreateDateColumn({
    name: 'created_at',
    comment: '생성일',
    type: 'datetime',
    select: false,
  })
  createdAt: Date;
}
