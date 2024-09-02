module.exports = function(fastify, personasController) {

    // Suscripción a mensajes NATS
    const nc = fastify.nats.nc;
    const sc = fastify.nats.sc;
    
    // Suscribirse al evento
    const subscription = nc.subscribe('persona.getAll');
    (async () => {
      for await (const msg of subscription) {
        console.log('persona.getAll');
        try {
          const items = await personasController.getItemsFromNats();
          nc.publish(msg.reply, sc.encode(JSON.stringify(items)));
        } catch (error) {
          nc.publish(msg.reply, sc.encode(JSON.stringify({ error: error.message })));
        }
      }
    })();
    
    fastify.addHook('onClose', (fastifyInstance, done) => {
      subscription.unsubscribe();
      done();
    });

};