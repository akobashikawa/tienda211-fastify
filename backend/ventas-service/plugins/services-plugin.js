const fp = require('fastify-plugin');
const ProductosService = require('../productos/productos-service');
const PersonasService = require('../personas/personas-service');
const VentasService = require('../ventas/ventas-service');

const PRODUCTOS_SERVICE_URL = process.env.PRODUCTOS_SERVICE_URL || 'http://localhost:3001/api/productos';
const PERSONAS_SERVICE_URL = process.env.PERSONAS_SERVICE_URL || 'http://localhost:3002/api/personas';

async function servicesPlugin(fastify, options) {

    // const productosService = new ProductosService({...fastify.repositories});
    const productosService = new ProductosService({ fastify, url: PRODUCTOS_SERVICE_URL });
    // const personasService = new PersonasService({...fastify.repositories});
    const personasService = new PersonasService({ fastify, url: PERSONAS_SERVICE_URL });
    const ventasService = new VentasService({...fastify.repositories, productosService, personasService});

    const services = {
        productosService,
        personasService,
        ventasService,
    };

    fastify.decorate('services', services);

}

module.exports = fp(servicesPlugin);