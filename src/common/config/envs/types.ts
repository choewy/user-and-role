import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { NextHandleFunction } from 'connect';

export type AppConfigType = {
  json: NextHandleFunction;
  urlencoded: NextHandleFunction;
  cors: CorsOptions;
};

export type ServerConfigType = {
  host: string;
  port: number;
};

export type TypeOrmConfigType = TypeOrmModuleOptions;

export type DefaultAccountConfigType = {
  ids: number[];
  names: string[];
  accounts: string[];
  passwords: string[];
};
