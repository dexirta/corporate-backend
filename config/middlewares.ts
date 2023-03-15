import { config } from './config';

export default [
  {
    name: 'strapi::cors',
    config: {
      cors: {
        origin: ['*'],
        expose: ['WWW-Authenticate', 'Server-Authorization', 'Access-Control-Expose-Headers'],
        maxAge: 31536000,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
        headers: [
          'Content-Type',
          'Authorization',
          'X-Frame-Options',
          'Origin',
          'Access-Control-Allow-Headers',
          'Access-Control-Allow-Origin',
          'Access',
        ],
      },
    },
  },
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'dl.airtable.com',
            /**
             * Note: If using a STORAGE_URL replace `https://${process.env.STORAGE_ACCOUNT}.blob.core.windows.net` w/ process.env.STORAGE_URL
             * If using a CDN URL make sure to include that url in the CSP headers process.env.STORAGE_CDN_URL
             */
            `https://${config.azure.upload.storageAccount}.blob.core.windows.net`,
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'dl.airtable.com',
            /**
             * Note: If using a STORAGE_URL replace `https://${process.env.STORAGE_ACCOUNT}.blob.core.windows.net` w/ process.env.STORAGE_URL
             * If using a CDN URL make sure to include that url in the CSP headers process.env.STORAGE_CDN_URL
             */
            `https://${config.azure.upload.storageAccount}.blob.core.windows.net`,
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
