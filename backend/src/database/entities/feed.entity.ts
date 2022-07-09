import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Tag } from './tag.entity';
import { User } from './user.entity';

const onDelete = 'CASCADE';

@Entity('Feed')
export class Feed {
  @PrimaryGeneratedColumn('uuid')
  readonly feedId: string;

  @Column('varchar')
  title: string;

  @Column('text')
  content: string;

  @Column('tinyint', { default: 1 })
  visible: number;

  @ManyToOne(() => User, (user) => user.userId, { onDelete })
  @JoinColumn({ name: 'user' })
  user: string;

  @ManyToOne(() => Tag, (tag) => tag.tagId, { onDelete })
  @JoinColumn({ name: 'tags' })
  tags: string[];

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @DeleteDateColumn()
  readonly deletedAt: Date;
}
