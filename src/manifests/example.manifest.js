import fs from 'fs';

import config from '../config/config.js';

const pkgJSONPath = new URL('../../eik.json', import.meta.url).pathname;
const eikJson = JSON.parse(fs.readFileSync(pkgJSONPath, 'utf8'));

const manifestHost = config.get('manifestHost');
const basePath = config.get('basePath');
const env = config.get('env');

const isDevelopment = env === 'development';

const eikVersion = eikJson.version;

const js = isDevelopment
  ? [`${manifestHost}${basePath}/assets/example.js`]
  : [
      `https://assets.acdn.no/pkg/TEMPLATE_APPNAME/${eikVersion}/example/example.js`,
    ];

const css = isDevelopment
  ? [`${manifestHost}${basePath}/assets/example.css`]
  : [
      `https://assets.acdn.no/pkg/TEMPLATE_APPNAME/${eikVersion}/example/example.css`,
    ];

export default {
  id: 'TEMPLATE_APPNAME',
  version: '0.1.0',
  name: 'Template Name',
  title: 'Template Title',
  description: 'Template Description',
  platform: ['web'],
  tags: ['example', 'template'],
  urlTemplate: `${manifestHost}${basePath}/example/embed`,
  js,
  css,
};
