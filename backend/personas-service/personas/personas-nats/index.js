const PersonasController = require('../personas-controller');

async function personasRouter(fastify, options) {
  const personasController = new PersonasController(fastify.services);

  fastify.get('/', (request, reply) => personasController.getItems(request, reply));
  require('./get-all')(fastify, personasController);

  fastify.get('/:id', (request, reply) => personasController.getItemById(request, reply));
  require('./get-by-id')(fastify, personasController);

  fastify.post('/', (request, reply) => personasController.createItem(request, reply));
  require('./create')(fastify, personasController);

  fastify.put('/:id', (request, reply) => personasController.updateItem(request, reply));
  require('./update')(fastify, personasController);
  
  // fastify.delete('/:id', (request, reply) => personasController.deleteItem(request, reply));
  // require('./delete')(fastify, personasController);

  require('./persona-verify')(fastify, personasController);
}

module.exports = personasRouter;