import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const connection = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'checkout_db',
  synchronize: process.env.ENVIRONMENT === 'development',
  logging: process.env.ENVIRONMENT === 'development',
  entities: [path.join(__dirname, 'entities', '*.js')],
  migrations: [path.join(__dirname, 'migrations', '*.js')],
  subscribers: [path.join(__dirname, 'subscribers', '*.js')],
  extra: {
    connectionLimit: 10,
    queueLimit: 0,
  },
});

async function init() {
  return connection.initialize()
}

async function teardown() {
  if (connection.isInitialized) {
    return connection.destroy();
  }
}

export { teardown, init, connection }
