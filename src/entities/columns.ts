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
  const options: ColumnOptions = {
    type: 'datetime',
    transformer: new DateTimeTransformer(),
    ...opt,
  };

  if (created === true) {
    return CreateDateColumn(options);
  }

  if (updated === true) {
    return UpdateDateColumn(options);
  }

  if (deleted === true) {
    return DeleteDateColumn(options);
  }

  return Column(options);
};
