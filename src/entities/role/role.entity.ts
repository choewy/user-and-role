import { DateTime } from 'luxon';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DateTimeColumn } from '../columns';
import { RoleAndPolicy } from '../role_and_policy';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  name: string;

  @OneToMany(() => RoleAndPolicy, (e) => e.roleId)
  policies: RoleAndPolicy[];

  @DateTimeColumn({ created: true })
  createdAt: DateTime;

  @DateTimeColumn({ updated: true })
  updatedAt: DateTime;

  @DateTimeColumn({ deleted: true })
  deletedAT: DateTime;
}
