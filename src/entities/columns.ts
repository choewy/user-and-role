import {
  Column,
  ColumnOptions,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DateTimeTransformer } from './transformers';

export const DateTimeColumn = (
  options?: ColumnOptions & {
    created?: boolean;
    updated?: boolean;
    deleted?: boolean;
  },
) => {
  if (options) {
    const { created, updated, deleted, ...opt } = options;

    if (created === true) {
      return CreateDateColumn({
        type: 'datetime',
        update: false,
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
        default: null,
        transformer: new DateTimeTransformer(false),
        ...opt,
      });
    }

    return Column({
      type: 'datetime',
      transformer: new DateTimeTransformer(false),
      ...opt,
    });
  }

  return Column({
    type: 'datetime',
    transformer: new DateTimeTransformer(false),
  });
};
