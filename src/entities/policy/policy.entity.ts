import { DateTime } from 'luxon';
import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { DateTimeColumn } from '../columns';
import { RoleAndPolicies } from '../role_and_policies';

@Entity('policy')
export class Policy {
  @PrimaryColumn()
  key: string;

  @OneToMany(() => RoleAndPolicies, (e) => e.policy)
  roles: RoleAndPolicies[];

  @DateTimeColumn({ created: true })
  createdAt: DateTime;

  @DateTimeColumn({ updated: true })
  updatedAt: DateTime;

  @DateTimeColumn({ deleted: true })
  deletedAt: DateTime;
}
