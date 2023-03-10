import { config } from './config';

export default {
  host: config.server.host,
  port: config.server.port,
  app: {
    keys: config.server.app.keys,
  },
  webhooks: {
    populateRelations: config.server.webhooks.populateRelations,
  },
  url: config.server.url,
};
