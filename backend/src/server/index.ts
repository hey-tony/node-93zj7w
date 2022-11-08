import * as Hapi from '@hapi/hapi';
import * as path from 'path';
import * as inert from '@hapi/inert';

import routes from './routes/'

const PORT = 9000;
const HOST = 'localhost';

export const server = Hapi.server({
  port: PORT,
  host: HOST,
  routes: {
    files: {
      relativeTo: path.join(__dirname, '../public'),
    },
  },
});

const init = async () => {
  await server.register(inert);

  server.route( routes as Hapi.ServerRoute[] );

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

init();
