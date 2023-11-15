import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DB_DATABASE || 'postgres', process.env.DB_USERNAME || 'postgres', process.env.DB_PASSWORD || 'postgres', {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: Number(process.env.DB_PORT) || 5434
});

export {sequelize};