const VentasController = require('./ventas-controller');

async function ventasRouter(fastify, options) {
  const ventasController = new VentasController(fastify.services);

  fastify.get('/', (request, reply) => ventasController.getItems(request, reply));
  fastify.get('/:id', (request, reply) => ventasController.getItemById(request, reply));
  fastify.post('/', (request, reply) => ventasController.createItem(request, reply));
  fastify.put('/:id', (request, reply) => ventasController.updateItem(request, reply));
  fastify.delete('/:id', (request, reply) => ventasController.deleteItem(request, reply));
}

module.exports = ventasRouter;