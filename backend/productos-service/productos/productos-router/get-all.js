module.exports = function(fastify, productosController) {

    // Suscripción a mensajes NATS
    const natsClient = fastify.natsClient;
    const sc = fastify.natsStringCodec;
    
    // Suscribirse al evento 'producto.getAll'
    const subscription = natsClient.subscribe('producto.getAll');
    (async () => {
      for await (const msg of subscription) {
        console.log('producto.getAll');
        try {
          const items = await productosController.getItemsFromNats();
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