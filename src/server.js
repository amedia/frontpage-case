#!/usr/bin/env node
import http from 'http';
import { randomUUID } from 'node:crypto';

import express from 'express';
import compression from 'compression';
import cors from 'cors';
import dnscache from 'dnscache';

import config from './config/config.js';
import logger from './logger.js';
import router from './routes/router.js';

dnscache({
  enable: true,
  ttl: 30,
  cachesize: 1000,
});

const app = express();

// Configure application
app.disable('x-powered-by');
app.enable('trust proxy');

// Set middleware
app.use(compression());
app.use(cors());

// Attach assets route
app.use(
  `${config.get('basePath')}/assets`,
  (req, res, next) => {
    logger.info('/assets');
    next();
  },
  express.static('public')
);

app.use(config.get('basePath'), router);

// Error handling
app.use((error, _req, res, next) => {
  logger.error(error);
  // do not leak stack trace to response
  next();
});

// Set up http server and Export application
const server = http.createServer(app);

// Start application
server.listen(config.get('httpServerPort'), () => {
  logger.info(`server running at http://localhost:${server.address().port}`);
  logger.info(`server process has pid ${process.pid}`);
  logger.info(
    `api routes available under http://localhost:${
      server.address().port
    }${config.get('basePath')}`
  );
});

// Catch uncaught exceptions, log it and take down server in a nice way.
// Upstart or forever should handle kicking the process back into life!

process.on('uncaughtException', (error) => {
  logger.error(
    'shutdown - server taken down by force due to a uncaughtException'
  );
  logger.error(error.message);
  logger.error(error.stack);
  server.close();
  process.nextTick(() => {
    process.exit(1);
  });
});

// Listen for SIGINT (Ctrl+C) and do a gracefull takedown of the server

process.on('SIGINT', () => {
  logger.info('shutdown - got SIGINT - taking down server gracefully');
  server.close();
  process.nextTick(() => {
    process.exit(0);
  });
});

// Listen for SIGTERM (Upstart) and do a gracefull takedown of the server

process.on('SIGTERM', () => {
  logger.info('shutdown - got SIGTERM - taking down server gracefully');
  server.close();
  process.nextTick(() => {
    process.exit(0);
  });
});
