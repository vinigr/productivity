import { createServer } from 'http';

import app from './app';

const server = createServer(app.callback());

server.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.info(`Server started on port: ${3333}`);
});

if (module.hot) {
  module.hot.accept('./index.js', () => {
    // app.removeListener('request', currentApp);
    app.on('request', app);
    // currentApp = app;
  });
}
