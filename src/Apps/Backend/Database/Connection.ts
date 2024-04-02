import { Sequelize } from 'sequelize';

let sequelizeConnection: Sequelize = new Sequelize("rick_morty", "postgres", "1024", {
    host: "127.0.0.1",
    dialect: 'postgres',
    port: 5432,
    logging: false,
});

export default sequelizeConnection;