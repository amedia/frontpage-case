import { init } from '@amedia/node-log';

import config from './config/config.js';

export default init(config.getProperties()).logger();
