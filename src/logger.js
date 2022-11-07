import pino from 'pino';
import config from './config/config.js';

const cfg = config.getProperties()

const levels = ['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'];

export default pino(
  {
    name: cfg.name,
    base: {
      application: cfg.name,
      serverName: cfg.serverName,
      pid: process.pid,
      hostname: cfg.hostName,
    },
    level: cfg.logLevel,
    ...(cfg.prettyLog && {
      transport: {
        target: 'pino-pretty',
        options: {
          ...cfg.prettyLog,
        },
      },
    }),
  },
  cfg.prettyLog ? process.stdout : undefined
);
