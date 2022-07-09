import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

const onDelete = 'CASCADE';

@Entity('Follow')
export class Follow {
  @PrimaryGeneratedColumn('uuid')
  readonly followId: string;

  @ManyToOne(() => User, (user) => user.userId, { onDelete })
  @JoinColumn({ name: 'userId' })
  userId: string;

  @ManyToOne(() => User, (user) => user.userId, { onDelete })
  @JoinColumn({ name: 'otherId' })
  otherId: string;
}
