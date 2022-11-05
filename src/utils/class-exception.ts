import { HttpException } from '@nestjs/common';

export abstract class ClassException {
  private readonly $exception: HttpException;

  public constructor(exception: HttpException) {
    this.$exception = exception;
  }

  public throw() {
    throw this.$exception;
  }
}
