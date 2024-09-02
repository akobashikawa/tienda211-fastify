const VentasController = require('../ventas-controller');

async function ventasRouter(fastify, options) {
  const ventasController = new VentasController(fastify.services);

  fastify.get('/', (request, reply) => ventasController.getItems(request, reply));
  require('./get-all')(fastify, ventasController);

  fastify.get('/:id', (request, reply) => ventasController.getItemById(request, reply));
  require('./get-by-id')(fastify, ventasController);

  fastify.post('/', (request, reply) => ventasController.createItem(request, reply));
  require('./create')(fastify, ventasController);

  fastify.put('/:id', (request, reply) => ventasController.updateItem(request, reply));
  require('./update')(fastify, ventasController);
  
  // fastify.delete('/:id', (request, reply) => ventasController.deleteItem(request, reply));
  // require('./delete')(fastify, ventasController);

}

module.exports = ventasRouter;