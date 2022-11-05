import { DateTime } from 'luxon';
import { FindOperator, ValueTransformer } from 'typeorm';

export class DateTimeTransformer implements ValueTransformer {
  constructor(private readonly autoGenerateMode: boolean) {}

  to(
    value: FindOperator<DateTime> | DateTime | null | undefined,
  ): FindOperator<DateTime> | string | null {
    if (value instanceof FindOperator) {
      return value;
    }

    if (value === null) {
      return null;
    }

    if (value === undefined) {
      return this.autoGenerateMode === true
        ? DateTime.local().toSQL({ includeOffset: false })
        : null;
    }

    return value.toSQL({ includeOffset: false });
  }

  from(value: DateTime | null): DateTime | null {
    return value;
  }
}
