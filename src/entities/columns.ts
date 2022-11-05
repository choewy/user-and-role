import {
  Column,
  ColumnOptions,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DateTimeTransformer } from './transformers';

export const DateTimeColumn = ({
  created,
  updated,
  deleted,
  ...opt
}: ColumnOptions & {
  created?: boolean;
  updated?: boolean;
  deleted?: boolean;
}) => {
  if (created === true) {
    return CreateDateColumn({
      type: 'datetime',
      transformer: new DateTimeTransformer(true),
      ...opt,
    });
  }

  if (updated === true) {
    return UpdateDateColumn({
      type: 'datetime',
      transformer: new DateTimeTransformer(true),
      ...opt,
    });
  }

  if (deleted === true) {
    return DeleteDateColumn({
      type: 'datetime',
      transformer: new DateTimeTransformer(false),
      ...opt,
    });
  }

  return Column({
    type: 'datetime',
    transformer: new DateTimeTransformer(false),
    ...opt,
  });
};
