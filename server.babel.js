'use strict';

import pkg from './package';
import express from 'express';
import useWebpackMiddlewareWithWatch from './webpack.config.dev.watch.babel';

const app = express();

const { config: { port, dirs: { dest }, env: { prod } } } = pkg;

if (process.env.NODE_ENV === prod) {
  app.use(express.static(`${__dirname}/${dest}`));

  app.get('*', function(req, res) {
    res.sendFile(`${__dirname}/${dest}/index.html`);
  });
} else {
  useWebpackMiddlewareWithWatch(app);
}

app.listen(port);

console.log(`\nMagic happens on http://localhost:${port}....\n`);
