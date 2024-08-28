module.exports = function (fastify, personasController) {

  // Suscripción a mensajes NATS
  const natsClient = fastify.natsClient;
  const sc = fastify.natsStringCodec;

  // Suscribirse al evento 'persona.createItem'
  const subscription = natsClient.subscribe('persona.update');
  (async () => {
    for await (const msg of subscription) {
      console.log('persona.update');
      try {
        // Decodificar el mensaje recibido
        const data = JSON.parse(sc.decode(msg.data));
        const id = data.id;

        // Llamar al método para crear el persona
        const updatedItem = await personasController.updateItemFromNats(id, data);

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