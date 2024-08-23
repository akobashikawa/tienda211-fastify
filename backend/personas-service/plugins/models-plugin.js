const fp = require('fastify-plugin');
const sequelize = require('./sequelize-config');
const modelsConfig = require('./models-config');

async function modelsPlugin(fastify, options) {

    fastify.decorate('sequelize', sequelize);

    // Conectar a la base de datos
    try {
        await sequelize.authenticate();
        fastify.log.info('sequelize OK');

        const models = modelsConfig(sequelize);
        fastify.decorate('models', models);
        fastify.log.info('models OK');
    } catch (error) {
        fastify.log.error('sequelize KO: ', error);
    }

}

module.exports = fp(modelsPlugin);