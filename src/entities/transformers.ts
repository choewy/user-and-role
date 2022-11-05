import { DateTime } from 'luxon';
import { FindOperator, ValueTransformer } from 'typeorm';

export class DateTimeTransformer implements ValueTransformer {
  constructor(private readonly autoGenerateMode = false) {}

  to(
    value: FindOperator<DateTime> | DateTime | null,
  ): FindOperator<DateTime> | string | null {
    console.log(value);

    if (value instanceof FindOperator) {
      return value;
    }

    if (value === null) {
      return null;
    }

    return value.toSQL({ includeOffset: true });
  }

  from(value: DateTime | null): DateTime | null {
    return value;
  }
}
