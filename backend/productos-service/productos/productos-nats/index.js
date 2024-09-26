const ProductosController = require('../productos-controller');

async function productosRouter(fastify, options) {
  const productosController = new ProductosController(fastify.services);// provee los metodos http para usar aca
  // IDEA: const productosNATSController = new ProductosNATSController(fastify.services);// provee los metodos nats para usar aca... quizas deberia ir dentro de productosNATSRouter

  fastify.get('/', (request, reply) => productosController.getItems(request, reply));
  require('./get-all')(fastify, productosController);

  fastify.get('/:id', (request, reply) => productosController.getItemById(request, reply));
  require('./get-by-id')(fastify, productosController);

  fastify.post('/', (request, reply) => productosController.createItem(request, reply));
  require('./create')(fastify, productosController);

  fastify.put('/:id', (request, reply) => productosController.updateItem(request, reply));
  require('./update')(fastify, productosController);

  // fastify.delete('/:id', (request, reply) => productosController.deleteItem(request, reply));
  // require('./delete')(fastify, productosController);

  require('./producto-verify')(fastify, productosController);

}

module.exports = productosRouter;