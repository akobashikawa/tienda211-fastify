module.exports = function (fastify, productosController) {

  // Suscripción a mensajes NATS
  const nc = fastify.nats.nc;
  const sc = fastify.nats.sc;

  // Suscribirse al evento 'producto.createItem'
  const subscription = nc.subscribe('producto.create');
  (async () => {
    for await (const msg of subscription) {
      console.log('producto.create');
      try {
        // Decodificar el mensaje recibido
        const data = JSON.parse(sc.decode(msg.data));

        // Llamar al método para crear el producto
        const newItem = await productosController.createItemFromNats(data);

        // Publicar la respuesta en NATS usando el reply-to del mensaje
        nc.publish(msg.reply, sc.encode(JSON.stringify(newItem)));
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