import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Tag')
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  readonly tagId: string;

  @Column('varchar')
  tag: string;
}
