const fp = require('fastify-plugin');
// const ProductosRepository = require('../productos/productos-repository');
// const PersonasRepository = require('../personas/personas-repository');
const VentasRepository = require('../ventas/ventas-repository');

async function repositoriesPlugin(fastify, options) {

    // const productosRepository = new ProductosRepository(fastify.models);
    // const personasRepository = new PersonasRepository(fastify.models);
    const ventasRepository = new VentasRepository(fastify.models);

    const repositories = {
        // productosRepository,
        // personasRepository,
        ventasRepository,
    };

    fastify.decorate('repositories', repositories);

}

module.exports = fp(repositoriesPlugin);