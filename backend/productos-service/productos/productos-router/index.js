const ProductosController = require('../productos-controller');

async function productosRouter(fastify, options) {
  const productosController = new ProductosController(fastify.services);

  // fastify.get('/', (request, reply) => productosController.getItems(request, reply));
  require('./get-all')(fastify, productosController);
  fastify.get('/:id', (request, reply) => productosController.getItemById(request, reply));
  // fastify.post('/', (request, reply) => productosController.createItem(request, reply));
  require('./create')(fastify, productosController);
  fastify.put('/:id', (request, reply) => productosController.updateItem(request, reply));
  fastify.delete('/:id', (request, reply) => productosController.deleteItem(request, reply));

}

module.exports = productosRouter;