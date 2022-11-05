import { DateTime } from 'luxon';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { DateTimeColumn } from '../columns';
import { Policy } from '../policy';
import { Role } from '../role';

@Entity('role_and_policies')
export class RoleAndPolicies {
  @PrimaryColumn({ primary: false })
  roleId: number;

  @PrimaryColumn({ primary: false })
  policyKey: string;

  @ManyToOne(() => Role, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToOne(() => Policy, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'policy_key' })
  policy: Policy;

  @Column()
  isApply: boolean;

  @DateTimeColumn({ created: true })
  createdAt: DateTime;

  @DateTimeColumn({ updated: true })
  updatedAt: DateTime;
}
