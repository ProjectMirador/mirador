const jsonServer = require('json-server'); // eslint-disable-line import/no-extraneous-dependencies

const server = jsonServer.create();
const router = jsonServer.router('./scripts/json-server/fixture-server-config.json');
const defaults = {
  static: './__tests__/fixtures',
};

const middlewares = jsonServer.defaults(defaults);

server.use(middlewares);
server.use(router);
server.listen(5000, () => {});
