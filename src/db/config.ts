import { Dialect, Sequelize } from 'sequelize';
require('dotenv').config();
const isTest = process.env.NODE_ENV === 'test';

const dbName = isTest
  ? (process.env.TEST_DB_NAME as string)
  : (process.env.DB_NAME as string);
const dbUser = process.env.DB_USERNAME as string;
const dbHost = process.env.DB_HOST;
const dbDriver = process.env.DB_DRIVER as Dialect;
const dbPassword = process.env.DB_PASSWORD;

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver,
  logging: false,
});

sequelizeConnection
  .authenticate()
  .then(() => console.log('Database connected successfully.'))
  .catch((err) => console.error('Unable to connect to the database:', err));

export default sequelizeConnection;
