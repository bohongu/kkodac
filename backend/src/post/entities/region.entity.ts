import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'region_tb' })
export class Region {
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
    comment: 'rowId',
    unsigned: true,
  })
  _id: number;

  @Index({ unique: true })
  @Column({
    name: 'region_id',
    comment: '지역 UUID',
    type: 'varchar',
    length: 40,
    nullable: false,
  })
  regionId: string;

  @CreateDateColumn({
    name: 'created_at',
    comment: '생성일',
    type: 'datetime',
  })
  createdAt: Date;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 50,
    nullable: false,
    comment: '지역 이름',
  })
  name: string;
}
