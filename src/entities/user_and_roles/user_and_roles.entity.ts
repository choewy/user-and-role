import { DateTime } from 'luxon';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { DateTimeColumn } from '../columns';
import { Role } from '../role';
import { User } from '../user';

@Entity('user_and_roles')
export class UserAndRoles {
  @PrimaryColumn({ primary: false })
  userId: number;

  @PrimaryColumn({ primary: false })
  roleId: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Role, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @DateTimeColumn({ created: true })
  createdAt: DateTime;
}
