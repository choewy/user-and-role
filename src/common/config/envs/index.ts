export * from './types';
export * from './enums';

import app from './app.envs';
import server from './server.envs';
import typeorm from './typeorm.env';

export const envs = [app, server, typeorm];
