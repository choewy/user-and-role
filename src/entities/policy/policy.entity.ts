import { DateTime } from 'luxon';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DateTimeColumn } from '../columns';
import { RoleAndPolicy } from '../role_and_policy';

@Entity('policy')
export class Policy {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  name: string;

  @OneToMany(() => RoleAndPolicy, (e) => e.policyId)
  roles: RoleAndPolicy[];

  @DateTimeColumn({ created: true })
  createdAt: DateTime;

  @DateTimeColumn({ updated: true })
  updatedAt: DateTime;

  @DateTimeColumn({ deleted: true })
  deletedAt: DateTime;
}
