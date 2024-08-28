module.exports = function (fastify, productosController) {

  // Suscripción a mensajes NATS
  const natsClient = fastify.natsClient;
  const sc = fastify.natsStringCodec;

  // Suscribirse al evento 'producto.createItem'
  const subscription = natsClient.subscribe('producto.create');
  (async () => {
    for await (const msg of subscription) {
      console.log('producto.create');
      try {
        // Decodificar el mensaje recibido
        const data = JSON.parse(sc.decode(msg.data));

        // Llamar al método para crear el producto
        const newItem = await productosController.createItemFromNats(data);

        // Publicar la respuesta en NATS usando el reply-to del mensaje
        natsClient.publish(msg.reply, sc.encode(JSON.stringify(newItem)));
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