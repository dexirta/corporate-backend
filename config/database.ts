import fs from 'fs';
import path from 'path';
import { config } from './config';

enum EDbConnectors {
  MYSQL = 'mysql',
  SQLITE = 'sqlite',
}

export default () => {
  const client = config.env === 'production' ? EDbConnectors.MYSQL : EDbConnectors.SQLITE;
  const cert = fs.readFileSync('./certs/DigiCertGlobalRootCA.crt.pem', 'utf8');

  const connections = {
    mysql: {
      connection: {
        host: config.db.mysql.host,
        port: config.db.mysql.port,
        database: config.db.mysql.database,
        user: config.db.mysql.user,
        password: config.db.mysql.password,
        ssl: config.db.mysql.ssl && {
          cert: cert || null,
          rejectUnauthorized: true,
        },
      },
      pool: { min: 2, max: 15 },
    },

    sqlite: {
      connection: {
        filename: path.join(__dirname, '..', '..', config.db.sqlite.dbFileName),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: 60000,
    },
  };
};
