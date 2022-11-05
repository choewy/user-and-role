export * from './interfaces';
export * from './constants';

import server from './server.config';
import cors from './cors.config';
import typeorm from './typeorm.config';
import swagger from './swagger.config';

export const configs = [server, cors, typeorm, swagger];
