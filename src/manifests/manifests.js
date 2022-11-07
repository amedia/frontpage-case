import { createManifest } from '@amedia/create-component';

import config from '../config/config.js';
import logger from '../logger.js';

// Import manifests
import exampleManifest from './example.manifest.js';

const manifestEnv = config.get('manifestEnv');

// Add any options to this object
const options = {
  logger,
  env: manifestEnv,
};

// Add manifest to this object
export default {
  exampleManifest: createManifest(exampleManifest, options),
};
