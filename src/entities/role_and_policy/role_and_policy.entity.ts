import { DateTime } from 'luxon';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { DateTimeColumn } from '../columns';
import { Policy } from '../policy';
import { Role } from '../role/role.entity';

@Entity('role_and_policy')
export class RoleAndPolicy {
  @PrimaryColumn({ primary: false })
  roleId: number;

  @PrimaryColumn({ primary: false })
  policyId: number;

  @ManyToOne(() => Role, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToOne(() => Policy, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'policy_id' })
  policy: Policy;

  @Column()
  isApply: boolean;

  @DateTimeColumn()
  appliedAt: DateTime;
}
