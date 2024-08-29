module.exports = function(fastify, productosController) {

    // Suscripción a mensajes NATS
    const nc = fastify.nats.nc;
    const sc = fastify.nats.sc;
    
    // Suscribirse al evento 'producto.getAll'
    const subscription = nc.subscribe('producto.getAll');
    (async () => {
      for await (const msg of subscription) {
        console.log('producto.getAll');
        try {
          const items = await productosController.getItemsFromNats();
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