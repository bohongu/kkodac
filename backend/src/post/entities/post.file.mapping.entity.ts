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

@Entity({ name: 'post_file_map_tb' })
export class PostFileMapper {
  @PrimaryGeneratedColumn('increment', { comment: 'rowId' })
  _id: number;

  @ManyToOne(() => Post, (post) => post.fileMappers, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'post_id', referencedColumnName: 'postId' })
  post: Post;

  @OneToOne(() => File, (file) => file, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'file_id', referencedColumnName: 'fileId' })
  file: File;

  @CreateDateColumn({
    name: 'created_at',
    comment: '생성일',
    type: 'datetime',
    select: false,
  })
  createdAt: Date;
}
