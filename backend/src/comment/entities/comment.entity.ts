import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity({
  name: 'comment_tb',
})
export class Comment {
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
    comment: 'rowId',
    unsigned: true,
  })
  _id: number;

  @Index({ unique: true })
  @Column({
    name: 'comment_id',
    comment: '댓글 UUID',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  commentId: string = uuidv4();

  @Column({
    name: 'description',
    type: 'varchar',
    length: 256,
    nullable: false,
    comment: '댓글 내용',
  })
  description: string;

  @CreateDateColumn({
    name: 'created_at',
    comment: '생성일',
    type: 'datetime',
  })
  createdAt: Date;

  @OneToOne(() => User, (user) => user, {
    createForeignKeyConstraints: false,
    nullable: false,
  })
  @JoinColumn({
    name: 'author_id',
    referencedColumnName: 'userId',
  })
  authorId: User;
}
