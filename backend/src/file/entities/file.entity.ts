import { replaceAll } from 'src/utils/uuid.util';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'FILE_TB' })
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
    type: 'binary',
    length: 16,
    nullable: false,
  })
  fileId: string | Buffer = Buffer.from(replaceAll(uuidv4(), '-', ''), 'hex');

  @CreateDateColumn({
    name: 'created_at',
    comment: '생성일',
    type: 'datetime',
  })
  createdAt: Date;

  @Index({ unique: false })
  @Column({
    name: 'deploy_name',
    type: 'char',
    length: 32,
    nullable: false,
    comment: '서버에 배포된 파일명 (UUID)',
  })
  deployName: string;

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
