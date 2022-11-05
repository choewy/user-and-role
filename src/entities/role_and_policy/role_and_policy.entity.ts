import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Policy } from '../policy';
import { Role } from '../role/role.entity';

@Entity('role_and_policy')
export class RoleAndPolicy {
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
}
