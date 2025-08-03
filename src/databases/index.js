import { constants } from '../config/index.js';
import utils from '../utils/utils.js';

import 'reflect-metadata';
import { DataSource } from 'typeorm';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class AppDatabase {
  connection;

  constructor() {
    this.connection = new DataSource({
      type: constants.DATABASE_CONNECTION.NAME,
      host: constants.DATABASE_CONNECTION.HOST,
      port: constants.DATABASE_CONNECTION.PORT,
      username: constants.DATABASE_CONNECTION.USER,
      password: constants.DATABASE_CONNECTION.PASSWORD,
      database: constants.DATABASE_CONNECTION.DATABASE,
      synchronize: utils.isDevEnv(),
      logging: utils.isDevEnv(),
      entities: [path.join(__dirname, 'entities', '*.js')],
      migrations: [path.join(__dirname, 'migrations', '*.js')],
      subscribers: [path.join(__dirname, 'subscribers', '*.js')],
      extra: {
        connectionLimit: 10,
        queueLimit: 0,
      },
    });
  }

  async initialize() {
    return this.connection.initialize()
  }

  async teardown() {
    if (this.connection.isInitialized) {
      return this.connection.destroy();
    }
  }
}

const database = new AppDatabase()

export default database;
