import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'file_tb' })
export class File {
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
    comment: 'rowId',
    unsigned: true,
  })
  _id: number;

  @Index({ unique: true })
  @Column({
    name: 'file_id',
    comment: '파일 UUID',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  fileId: string = uuidv4();

  @CreateDateColumn({
    name: 'created_at',
    comment: '생성일',
    type: 'datetime',
  })
  createdAt: Date;

  @Index({ unique: false })
  @Column({
    name: 'original_name',
    type: 'varchar',
    length: 256,
    nullable: false,
    comment: '원본 파일명',
  })
  originalName: string;

  @Column({
    name: 'path_name',
    type: 'varchar',
    length: 256,
    nullable: false,
    comment: '서버측 경로명',
  })
  pathName: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'bucket',
    nullable: true,
    comment: 'S3 버킷 이름',
  })
  bucket: string;
}
