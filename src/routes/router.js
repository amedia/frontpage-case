import express from 'express';
import metrics from '@amedia/metrics';

import logger from '../logger.js';
// Import manifests
import exampleView from '../views/example.view.js';
import manifests from '../manifests/manifests.js';

// Import Views

// Initiate Router
const router = express.Router();

// Set up routes
router.get(
  '/example/manifest',
  metrics.label('ego-top-manifest'),
  (req, res) => {
    logger.info('Somebody is running the example manifest!');
    res.headerManager.addLocalGroup(`/example-manifest`);
    res.headerManager.setLocalChannelMaxAge(86400);
    res.headerManager.setLocalMaxAge(0);
    return res.json(manifests.exampleManifest);
  }
);

router.get('/example/embed', metrics.label('foo'), (req, res) => {
  logger.info('Somebody is running the example!');
  // How long should this live in varnish cache
  res.headerManager.setLocalChannelMaxAge(60);
  // How long should this live in browser cache
  res.headerManager.setLocalMaxAge(30);
  res.type('text/html');
  const html = exampleView({ geeks: 'geeks' });
  res.end(html);
});

// Export application
export default router;
