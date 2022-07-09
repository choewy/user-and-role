import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Feed } from './feed.entity';
import { Follow } from './follow.entity';

const cascade = true;

@Entity('User')
export class User {
  @PrimaryGeneratedColumn('uuid')
  readonly userId: string;

  @Column('varchar')
  kakaoId: string;

  @Column('tinyint')
  gender: number;

  @Column({ type: 'float', default: null })
  height: number;

  @Column({ type: 'float', default: null })
  weight: number;

  @Column({ type: 'tinyint', default: 0 })
  role: number;

  @Column({ type: 'varchar', default: null })
  signCode: string;

  @OneToMany(() => Follow, (follow) => follow.userId, { cascade })
  @JoinColumn({ name: 'following' })
  following: string[];

  @OneToMany(() => Follow, (follow) => follow.otherId, { cascade })
  @JoinColumn({ name: 'follower' })
  follower: string[];

  @OneToMany(() => Feed, (feed) => feed.feedId, { cascade })
  @JoinColumn({ name: 'feeds' })
  feeds: string[];

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @DeleteDateColumn()
  readonly deletedAt: Date;
}
