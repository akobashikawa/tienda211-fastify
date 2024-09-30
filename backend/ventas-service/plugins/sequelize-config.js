const { Sequelize } = require('sequelize');

// sqlite en memoria
// const sequelize = new Sequelize({
//     dialect: 'sqlite',
//     storage: ':memory:',
// });

// Crear la instancia de Sequelize para PostgreSQL
const POSTGRESQL_DB = process.env.POSTGRESQL_DB;
const POSTGRESQL_USER = process.env.POSTGRESQL_USER;
const POSTGRESQL_PASS = process.env.POSTGRESQL_PASS;
const POSTGRESQL_HOST = process.env.POSTGRESQL_HOST;
const POSTGRESQL_PORT = process.env.POSTGRESQL_PORT;
const sequelize = new Sequelize(POSTGRESQL_DB, POSTGRESQL_USER, POSTGRESQL_PASS, {
    host: POSTGRESQL_HOST,
    dialect: 'postgres',
    port: POSTGRESQL_PORT,
});

module.exports = sequelize;