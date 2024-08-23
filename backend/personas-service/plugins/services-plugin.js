const fp = require('fastify-plugin');
// const ProductosService = require('../productos/productos-service');
// const VentasService = require('../ventas/ventas-service');
const PersonasService = require('../personas/personas-service');

async function servicesPlugin(fastify, options) {

    // const productosService = new ProductosService({...fastify.repositories});
    const personasService = new PersonasService({...fastify.repositories});
    // const ventasService = new VentasService({...fastify.repositories, productosService, personasService});

    const services = {
        // productosService,
        personasService,
        // ventasService,
    };

    fastify.decorate('services', services);

}

module.exports = fp(servicesPlugin);