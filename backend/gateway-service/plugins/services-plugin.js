const fp = require('fastify-plugin');
const ProductosService = require('../productos/productos-service');
const PersonasService = require('../personas/personas-service');
const VentasService = require('../ventas/ventas-service');

const PRODUCTOS_SERVICE_URL = process.env.PRODUCTOS_SERVICE_URL || 'http://localhost:3001/api/productos';
const PERSONAS_SERVICE_URL = process.env.PERSONAS_SERVICE_URL || 'http://localhost:3002/api/personas';
const VENTAS_SERVICE_URL = process.env.VENTAS_SERVICE_URL || 'http://localhost:3003/api/ventas';

async function servicesPlugin(fastify, options) {

    const productosService = new ProductosService({ url: PRODUCTOS_SERVICE_URL });
    fastify.log.info(`PRODUCTOS_SERVICE_URL: ${PRODUCTOS_SERVICE_URL}`);
    const personasService = new PersonasService({ url: PERSONAS_SERVICE_URL });
    fastify.log.info(`PERSONAS_SERVICE_URL: ${PERSONAS_SERVICE_URL}`);
    const ventasService = new VentasService({ url: VENTAS_SERVICE_URL });
    fastify.log.info(`VENTAS_SERVICE_URL: ${VENTAS_SERVICE_URL}`);

    const services = {
        productosService,
        personasService,
        ventasService,
    };

    fastify.decorate('services', services);

}

module.exports = fp(servicesPlugin);