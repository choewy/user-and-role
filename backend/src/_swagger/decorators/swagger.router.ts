import { applyDecorators, Delete, Get, Patch, Post, Put } from '@nestjs/common';

const httpMethods = ['get', 'post', 'patch', 'put', 'delete'] as const;

type HttpMethods = typeof httpMethods[number];

const httpMethodDecorators: Record<
  HttpMethods,
  (path?: string | string[]) => MethodDecorator
> = {
  get: Get,
  post: Post,
  patch: Patch,
  put: Put,
  delete: Delete,
};

export interface SwaggerRouterDecorator {
  (method: HttpMethods, path?: string | string[]): any;
}

export const SwaggerRouter = (
  method: HttpMethods,
  path?: string | string[],
) => {
  return httpMethodDecorators[method](path);
};
