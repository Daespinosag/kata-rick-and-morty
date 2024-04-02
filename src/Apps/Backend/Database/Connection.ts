import { Sequelize } from 'sequelize';

import dotenv from 'dotenv';
dotenv.config();

let sequelizeConnection: Sequelize = new Sequelize(process.env.DATABASE_NAME ?? 'DEFINE_DATABASE_NAME',  process.env.DATABASE_USER ?? "DEFINE_DATABASE_USER", process.env.DATABASE_PASSWORD ?? "DEFINE_DATABASE_PASSWORD", {
    host: process.env.DATABASE_HOST ?? 'DEFINE_DATABASE_HOST',
    dialect: 'postgres',
    port: process.env.DATABASE_PORT ?  parseInt(process.env.DATABASE_PORT) : 5432,
    logging: process.env.DATABASE_LOGGER === 'true',
});

export default sequelizeConnection;