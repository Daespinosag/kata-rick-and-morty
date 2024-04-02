require('ts-node/register');

module.exports = {
  development: {
    username: "postgres",
    password: "1024",
    database: "rick_morty",
    host: "127.0.0.1",
    dialect: "postgres",
    port: "5432",
  },
  test: {
    username: "postgres",
    password: "1024",
    database: "rick_morty",
    host: "127.0.0.1",
    dialect: "postgres",
    port: 5433,
  },
  production: {
    username: "postgres",
    password: "1024",
    database: "rick_morty",
    host: "127.0.0.1",
    dialect: "postgres",
    port: 5433,
  }
};
