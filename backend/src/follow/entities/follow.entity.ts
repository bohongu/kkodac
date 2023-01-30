import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Follow {
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
    comment: 'rowId',
    unsigned: true,
  })
  _id: number;

  @Index({ unique: true })
  @Column({
    name: 'follow_id',
    comment: '팔로우 UUID',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  followId: string = uuidv4();

  @ManyToOne(() => User)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'userId',
  })
  user: User;

  @ManyToOne(() => User)
  @JoinColumn({
    name: 'followed_user_id',
    referencedColumnName: 'userId',
  })
  followedUser: User;
}
