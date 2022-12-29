import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity({
  name: 'file_tb',
  // engine: 'InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci',
})
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
  fileName: string;

  @Column({
    name: 'file_url',
    type: 'varchar',
    length: 256,
    nullable: false,
    comment: '서버측 경로명',
  })
  fileUrl: string;

  @Column({
    name: 'deploy_name',
    type: 'varchar',
    length: 256,
    nullable: false,
    comment: '서버측 파일명',
  })
  deployName: string;
}
