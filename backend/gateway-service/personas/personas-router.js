const PersonasController = require('./personas-controller');

async function personasRouter(fastify, options) {
  const personasController = new PersonasController(fastify.services);

  fastify.get('/', (request, reply) => personasController.getItems(request, reply));
  fastify.get('/:id', (request, reply) => personasController.getItemById(request, reply));
  fastify.post('/', (request, reply) => personasController.createItem(request, reply));
  fastify.put('/:id', (request, reply) => personasController.updateItem(request, reply));
  fastify.delete('/:id', (request, reply) => personasController.deleteItem(request, reply));
}

module.exports = personasRouter;