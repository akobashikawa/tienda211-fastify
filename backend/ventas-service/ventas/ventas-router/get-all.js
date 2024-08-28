module.exports = function(fastify, ventasController) {

    // Suscripción a mensajes NATS
    const natsClient = fastify.natsClient;
    const sc = fastify.natsStringCodec;
    
    // Suscribirse al evento 'venta.getAll'
    const subscription = natsClient.subscribe('venta.getAll');
    (async () => {
      for await (const msg of subscription) {
        console.log('venta.getAll');
        try {
          const items = await ventasController.getItemsFromNats();
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