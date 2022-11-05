import { DateTime } from 'luxon';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DateTimeColumn } from '../columns';
import { RoleAndPolicies } from '../role_and_policies';
import { UserAndRoles } from '../user_and_roles';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  name: string;

  @OneToMany(() => RoleAndPolicies, (e) => e.role)
  policies: RoleAndPolicies[];

  @OneToMany(() => UserAndRoles, (e) => e.role)
  users: UserAndRoles[];

  @DateTimeColumn({ created: true })
  createdAt: DateTime;

  @DateTimeColumn({ updated: true })
  updatedAt: DateTime;

  @DateTimeColumn({ deleted: true })
  deletedAT: DateTime;
}
