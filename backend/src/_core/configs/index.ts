export * from './interfaces';

import server from './server.config';
import cors from './cors.config';
import typeorm from './typeorm.config';

export const configs = [server, cors, typeorm];
