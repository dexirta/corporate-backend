import { config } from './config';
export default {
  auth: {
    secret: config.admin.secret,
  },
  apiToken: {
    salt: config.admin.apiToken,
  },
  transfer: {
    token: {
      salt: config.admin.transferApiToken,
    },
  },
  url: '/admin',
  serveAdminPanel: true,
};
