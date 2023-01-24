import { Exclude } from 'class-transformer';
import { File } from 'src/file/entities/file.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'user_tb' })
export class User {
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
    comment: 'rowId',
    unsigned: true,
  })
  _id: number;

  @Index({ unique: true })
  @Column({
    name: 'user_id',
    comment: '유저 UUID',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  userId: string = uuidv4();

  @Column({ nullable: true })
  kakaoAccount: string;

  @Column({ nullable: true })
  googleAccount: string;

  @Column({ type: 'text', nullable: true })
  refreshToken: string;

  @OneToOne(() => File, (file) => file, {
    createForeignKeyConstraints: false,
    nullable: true,
  })
  @JoinColumn({
    name: 'file_id',
    referencedColumnName: 'fileId',
  })
  fileId: File;

  @Column({
    name: 'social_file_id',
    type: 'varchar',
    length: 100,
    comment: '유저 비밀번호',
    nullable: true,
  })
  socialFileId: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 100,
    comment: '유저 비밀번호',
    nullable: true,
  })
  password: string;

  @Index({ unique: true })
  @Column({
    name: 'user_name',
    type: 'varchar',
    length: 40,
    comment: '유저 아이디',
    nullable: false,
  })
  username: string;

  @Column({
    name: 'nickname',
    type: 'varchar',
    length: 30,
    comment: '유저 닉네임',
    nullable: false,
  })
  nickname: string;

  @Column({
    name: 'introduce',
    type: 'varchar',
    length: 100,
    comment: '자기소개',
    nullable: true,
  })
  introduce: string;

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
}
