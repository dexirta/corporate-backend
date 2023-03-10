import convict from 'convict';
import dotenv from 'dotenv';

dotenv.config();

const cfg = convict({
  env: {
    doc: 'The application environment',
    format: ['production', 'development'],
    default: 'development',
    env: 'NODE_ENV',
  },
  server: {
    host: {
      doc: 'The application host',
      format: String,
      default: '0.0.0.0',
      env: 'HOST',
    },
    port: {
      doc: 'The application port',
      format: 'port',
      default: 1337,
      env: 'PORT',
    },
    url: {
      doc: 'The application url',
      format: String,
      default: '',
      env: 'SITE_URL',
    },
    app: {
      keys: {
        doc: 'The application keys',
        format: Array,
        default: [],
        env: 'APP_KEYS',
      },
    },
    webhooks: {
      populateRelations: {
        doc: 'The populateRelations webhook',
        format: Boolean,
        default: false,
        env: 'WEBHOOKS_POPULATE_RELATIONS',
      },
    },
  },
  db: {
    client: {
      doc: 'The application client',
      format: ['sqlite', 'mysql'],
      default: 'sqlite',
      env: 'DATABASE_CLIENT',
    },
    mysql: {
      host: {
        doc: 'The MySQL host',
        format: String,
        default: 'localhost',
        env: 'DATABASE_HOST',
      },
      port: {
        doc: 'The MySQL port',
        format: 'port',
        default: 3306,
        env: 'DATABASE_PORT',
      },
      database: {
        doc: 'The MySQL database name',
        format: String,
        default: 'strapi',
        env: 'DATABASE_NAME',
      },
      user: {
        doc: 'The MySQL user name',
        format: String,
        default: 'strapi',
        env: 'DATABASE_USERNAME',
      },
      password: {
        doc: 'The MySQL password',
        format: String,
        default: 'strapi',
        env: 'DATABASE_PASSWORD',
      },
      ssl: {
        doc: 'The MySQL ssl connection',
        format: Boolean,
        default: false,
        env: 'DATABASE_SSL',
      },
    },
    sqlite: {
      dbFileName: {
        doc: 'The SQLite database file',
        format: String,
        default: 'data.db',
        env: 'DATABASE_FILENAME',
      },
    },
  },
  admin: {
    secret: {
      doc: 'The admin panel JWT secret',
      format: String,
      default: '',
      env: 'ADMIN_JWT_SECRET',
    },
    apiToken: {
      doc: 'The admin panel apiToken salt',
      format: String,
      default: '',
      env: 'API_TOKEN_SALT',
    },
    transferApiToken: {
      doc: 'The admin panel transfer token salt',
      format: String,
      default: '',
      env: 'TRANSFER_TOKEN_SALT',
    },
  },
  azure: {
    upload: {
      storageAccount: {
        doc: 'The azure upload plugin storage account name',
        format: String,
        default: '',
        env: 'STORAGE_ACCOUNT',
      },
      storageAccountKey: {
        doc: 'The azure upload plugin storage account key',
        format: String,
        default: '',
        env: 'STORAGE_ACCOUNT_KEY',
      },
      containerName: {
        doc: 'The azure upload plugin storage container name',
        format: String,
        default: '',
        env: 'STORAGE_CONTAINER_NAME',
      },
      cdnBaseURL: {
        doc: 'The azure upload plugin CDN base url',
        format: String,
        default: '',
        env: 'STORAGE_CDN_URL',
      },
    },
  },
});

// Perform validation
cfg.validate({ allowed: 'strict' });

export const config = cfg.getProperties();
export type Config = typeof config;
