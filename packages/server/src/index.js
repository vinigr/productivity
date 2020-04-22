import { createServer } from 'http';

import { GRAPHQL_PORT } from './common/config';

import app from './app';

const server = createServer(app.callback());

server.listen(GRAPHQL_PORT, () => {
  // eslint-disable-next-line no-console
  console.info(`Server started on port: ${GRAPHQL_PORT}`);
});

if (module.hot) {
  module.hot.accept('./index.js', () => {
    // app.removeListener('request', currentApp);
    app.on('request', app);
    // currentApp = app;
  });
}
