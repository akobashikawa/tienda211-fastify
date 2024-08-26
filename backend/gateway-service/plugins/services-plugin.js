const fp = require('fastify-plugin');
const ProductosService = require('../productos/productos-service');
const PersonasService = require('../personas/personas-service');
const VentasService = require('../ventas/ventas-service');

async function servicesPlugin(fastify, options) {

    const productosService = new ProductosService({ natsClient: fastify.natsClient });
    const personasService = new PersonasService({ natsClient: fastify.natsClient });
    const ventasService = new VentasService({ natsClient: fastify.natsClient });

    const services = {
        productosService,
        personasService,
        ventasService,
    };

    fastify.decorate('services', services);

}

module.exports = fp(servicesPlugin);