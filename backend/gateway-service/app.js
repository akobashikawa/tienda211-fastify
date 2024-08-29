const fastify = require('fastify');
const app = fastify({
    // logger: true,
    logger: {
        level: 'info',
        transport: {
            target: 'pino-pretty',
            options: {
            },
        }
    },
});
const cors = require('@fastify/cors');
const fastifyStatic = require('@fastify/static');
const path = require('node:path');

app.setErrorHandler(function (error, request, reply) {
    if (error instanceof fastify.errorCodes.FST_ERR_BAD_STATUS_CODE) {
        // Log error
        this.log.error(error)
        // Send error response
        reply.status(500).send({ ok: false })
    } else {
        // fastify will use parent error handler to handle this
        reply.send(error)
    }
});

const natsPlugin = require('./plugins/nats-plugin');
// const modelsPlugin = require('./plugins/models-plugin');
// const repositoriesPlugin = require('./plugins/repositories-plugin');
const servicesPlugin = require('./plugins/services-plugin');

const productosRouter = require('./productos/productos-router');
const personasRouter = require('./personas/personas-router');
const ventasRouter = require('./ventas/ventas-router');


// Configurar CORS
app.register(cors, {
    origin: '*', // Permitir todas las fuentes
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Headers permitidos
});

// STATIC
app.register(fastifyStatic, {
    root: path.join(__dirname, 'frontend'),
});

app.register(natsPlugin);
// set app.sequelize
// set app.models
// app.register(modelsPlugin);

// uses app.models
// set app.repositories
// app.register(repositoriesPlugin);

// uses app.repositories
// set app.services
app.register(servicesPlugin);

// uses app.services
app.get('/api/hello', async (request, reply) => {
    reply.send('Hello');
});
app.get('/api/force-error', async (request, reply) => {
    throw new Error('Forced error');
});
app.register(productosRouter, { prefix: '/api/productos' });
app.register(personasRouter, { prefix: '/api/personas' });
app.register(ventasRouter, { prefix: '/api/ventas' });


app.addHook('onReady', () => {
    // const sequelize = app.sequelize;
    // sequelize.sync();

});

app.ready()
    .then(() => {
        app.log.info('app ready');
    });

module.exports = app;