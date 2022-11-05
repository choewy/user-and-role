import { DateTime } from 'luxon';
import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { DateTimeColumn } from '../columns';
import { RoleAndPolicy } from '../role_and_policy';

@Entity('policy')
export class Policy {
  @PrimaryColumn()
  key: string;

  @OneToMany(() => RoleAndPolicy, (e) => e.policyKey)
  roles: RoleAndPolicy[];

  @DateTimeColumn({ created: true })
  createdAt: DateTime;

  @DateTimeColumn({ updated: true })
  updatedAt: DateTime;

  @DateTimeColumn({ deleted: true })
  deletedAt: DateTime;
}
