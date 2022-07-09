import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

const onDelete = 'CASCADE';

@Entity('Sign')
export class Sign {
  @PrimaryGeneratedColumn('uuid')
  readonly signId: string;

  @Column('varchar')
  access: string;

  @Column('varchar')
  refresh: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.userId, { onDelete })
  @JoinColumn({ name: 'userId' })
  userId: string;
}
