const fp = require('fastify-plugin');
const ProductosService = require('../productos/productos-service');
const PersonasService = require('../personas/personas-service');
const VentasService = require('../ventas/ventas-service');

async function servicesPlugin(fastify, options) {

    const productosService = new ProductosService({ fastify });
    const personasService = new PersonasService({ fastify });
    const ventasService = new VentasService({ fastify });

    const services = {
        productosService,
        personasService,
        ventasService,
    };

    fastify.decorate('services', services);

}

module.exports = fp(servicesPlugin);