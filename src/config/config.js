import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

import convict from 'convict';

let pkgJSONPath = new URL('../../package.json', import.meta.url).pathname;
const isWin = process.platform === 'win32';
if (isWin) {
  // remove leading / on windows
  pkgJSONPath = pkgJSONPath.substring(1);
}
const pckage = JSON.parse(fs.readFileSync(pkgJSONPath, 'utf8'));

const dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuration schema
const conf = convict({
  env: {
    doc: 'Applicaton environments',
    format: ['development', 'production', 'test'],
    default: 'development',
    env: 'NODE_ENV',
    arg: 'env',
  },

  version: {
    doc: 'Version of the application',
    format: String,
    default: pckage.version,
  },

  name: {
    doc: 'Name of the application',
    format: String,
    default: 'frontpage-case',
  },

  serverType: {
    doc: 'Which type of server this is',
    format: String,
    default: 'dev',
    env: 'API_SERVER_TYPE',
  },

  serverName: {
    doc: 'The name of the server',
    format: String,
    default: 'dev',
    env: 'API_SERVER_NAME',
  },

  serverRole: {
    doc: 'The role of this server',
    format: String,
    default: 'dev',
    env: 'API_SERVER_ROLE',
  },

  backendType: {
    doc: 'Which type of backend this is',
    format: String,
    default: 'dev',
    env: 'API_BACKEND_TYPE',
  },

  contextPath: {
    doc: 'Context path for the application. Serves as a prefix for the paths in all URLs',
    format: String,
    default: '/frontpage-case',
  },

  basePath: {
    doc: 'The route the application is served on. This is the route the end user access in the browser',
    format: String,
    default: `/${pckage.name}`,
  },

  httpServerPort: {
    doc: 'The port the server should bind to',
    format: 'port',
    default: 8080, // Change this to your port
    env: 'PORT',
    arg: 'port',
  },

  logLevel: {
    doc: 'Which level the console transport log should log at',
    format: String,
    default: 'info',
    env: 'LOG_LEVEL',
  },

  prettyLog: {
    doc: 'Turn log pretty printing on and off',
    format: Object,
    default: null,
    nullable: true,
    env: 'LOG_PRETTY_PRINT',
  },

  hostName: {
    doc: 'Hostname',
    format: String,
    default: 'localhost',
    env: 'HOSTNAME',
  },

  clusterName: {
    doc: 'Cluster this app is running on',
    format: String,
    default: 'dev',
    env: 'CLUSTER_NAME',
  },

  servicesHostname: {
    doc: 'Services host',
    format: String,
    default: 'services.api.no',
    env: 'SERVICES_HOSTNAME',
  },
});

// Load config files

if (fs.existsSync(path.resolve(dirname, '../../config/local.json'))) {
  conf.loadFile([path.resolve(dirname, '../../config/local.json')]);
} else {
  conf.loadFile([
    path.resolve(dirname, '../../config/', `${conf.get('env')}.json`),
  ]);
}

// Validate all properties and export it
conf.validate();

export default conf;
