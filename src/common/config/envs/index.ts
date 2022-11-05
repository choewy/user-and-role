export * from './types';
export * from './enums';

import app from './app.envs';
import server from './server.envs';
import typeorm from './typeorm.env';
import accounts from './accounts.envs';
import bcrypt from './bcrypt.envs';
import jwt from './jwt.envs';

export const envs = [app, server, typeorm, accounts, bcrypt, jwt];
