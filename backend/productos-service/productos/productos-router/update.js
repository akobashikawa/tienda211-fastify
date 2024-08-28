module.exports = function (fastify, productosController) {

  // Suscripción a mensajes NATS
  const natsClient = fastify.natsClient;
  const sc = fastify.natsStringCodec;

  // Suscribirse al evento 'producto.createItem'
  const subscription = natsClient.subscribe('producto.update');
  (async () => {
    for await (const msg of subscription) {
      console.log('producto.update');
      try {
        // Decodificar el mensaje recibido
        const productData = JSON.parse(sc.decode(msg.data));
        const id = productData.id;

        // Llamar al método para crear el producto
        const newProduct = await productosController.updateItemFromNats(id, productData);

        // Publicar la respuesta en NATS usando el reply-to del mensaje
        natsClient.publish(msg.reply, sc.encode(JSON.stringify(newProduct)));
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