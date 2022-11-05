import { DateTime } from 'luxon';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DateTimeColumn } from '../columns';
import { UserAndRoles } from '../user_and_roles';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  account: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @OneToMany(() => UserAndRoles, (e) => e.user)
  roles: UserAndRoles[];

  @DateTimeColumn({ created: true })
  createdAt: DateTime;

  @DateTimeColumn({ updated: true })
  updatedAt: DateTime;

  @DateTimeColumn({ deleted: true })
  deletedAt: DateTime;
}
