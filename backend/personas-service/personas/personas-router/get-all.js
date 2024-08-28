module.exports = function(fastify, personasController) {

    // Suscripción a mensajes NATS
    const natsClient = fastify.natsClient;
    const sc = fastify.natsStringCodec;
    
    // Suscribirse al evento 'persona.getAll'
    const subscription = natsClient.subscribe('persona.getAll');
    (async () => {
      for await (const msg of subscription) {
        console.log('persona.getAll');
        try {
          const items = await personasController.getItemsFromNats();
          natsClient.publish(msg.reply, sc.encode(JSON.stringify(items)));
        } catch (error) {
          natsClient.publish(msg.reply, sc.encode(JSON.stringify({ error: error.message })));
        }
      }
    })();
    
    fastify.addHook('onClose', (fastifyInstance, done) => {
      subscription.unsubscribe();
      done();
    });

};