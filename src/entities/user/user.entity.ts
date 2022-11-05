import { DateTime } from 'luxon';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DateTimeColumn } from '../columns';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  name: string;

  @DateTimeColumn({ created: true })
  createdAt: DateTime;

  @DateTimeColumn({ updated: true })
  updatedAt: DateTime;

  @DateTimeColumn({ deleted: true })
  deletedAt: DateTime;
}
