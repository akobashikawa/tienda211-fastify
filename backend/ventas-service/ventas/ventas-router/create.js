module.exports = function (fastify, ventasController) {

  // Suscripción a mensajes NATS
  const natsClient = fastify.natsClient;
  const sc = fastify.natsStringCodec;

  // Suscribirse al evento 'venta.createItem'
  const subscription = natsClient.subscribe('venta.create');
  (async () => {
    for await (const msg of subscription) {
      console.log('venta.create');
      try {
        // Decodificar el mensaje recibido
        const data = JSON.parse(sc.decode(msg.data));

        // Llamar al método para crear el venta
        const newItem = await ventasController.createItemFromNats(data);

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