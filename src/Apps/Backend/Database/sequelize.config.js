require('ts-node/register');

const dotenv = require('dotenv');

module.exports = dotenv.config();


module.exports = {
  development: {
    username: process.env.DATABASE_USER ?? "DEFINE_DATABASE_USER",
    password: process.env.DATABASE_PASSWORD ?? "DEFINE_DATABASE_PASSWORD",
    database: process.env.DATABASE_NAME ?? 'DEFINE_DATABASE_NAME',
    host: process.env.DATABASE_HOST ?? 'DEFINE_DATABASE_HOST',
    dialect: "postgres",
    port: process.env.DATABASE_PORT ?? "5432",
  },
  test: {
    username: process.env.DATABASE_USER ?? "DEFINE_DATABASE_USER",
    password: process.env.DATABASE_PASSWORD ?? "DEFINE_DATABASE_PASSWORD",
    database: process.env.DATABASE_NAME ?? 'DEFINE_DATABASE_NAME',
    host: process.env.DATABASE_HOST ?? 'DEFINE_DATABASE_HOST',
    dialect: "postgres",
    port: process.env.DATABASE_PORT ?? "5432",
  },
  production: {
    username: process.env.DATABASE_USER ?? "DEFINE_DATABASE_USER",
    password: process.env.DATABASE_PASSWORD ?? "DEFINE_DATABASE_PASSWORD",
    database: process.env.DATABASE_NAME ?? 'DEFINE_DATABASE_NAME',
    host: process.env.DATABASE_HOST ?? 'DEFINE_DATABASE_HOST',
    dialect: "postgres",
    port: process.env.DATABASE_PORT ?? "5432",
  }
};
