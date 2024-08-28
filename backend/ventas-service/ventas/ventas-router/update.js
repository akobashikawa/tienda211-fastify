module.exports = function (fastify, ventasController) {

  // Suscripción a mensajes NATS
  const natsClient = fastify.natsClient;
  const sc = fastify.natsStringCodec;

  // Suscribirse al evento 'venta.createItem'
  const subscription = natsClient.subscribe('venta.update');
  (async () => {
    for await (const msg of subscription) {
      console.log('venta.update');
      try {
        // Decodificar el mensaje recibido
        const data = JSON.parse(sc.decode(msg.data));
        const id = data.id;

        // Llamar al método para crear el venta
        const updatedItem = await ventasController.updateItemFromNats(id, data);

        // Publicar la respuesta en NATS usando el reply-to del mensaje
        natsClient.publish(msg.reply, sc.encode(JSON.stringify(updatedItem)));
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