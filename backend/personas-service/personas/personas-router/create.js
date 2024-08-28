module.exports = function (fastify, personasController) {

  // Suscripción a mensajes NATS
  const natsClient = fastify.natsClient;
  const sc = fastify.natsStringCodec;

  // Suscribirse al evento 'persona.createItem'
  const subscription = natsClient.subscribe('persona.create');
  (async () => {
    for await (const msg of subscription) {
      console.log('persona.create');
      try {
        // Decodificar el mensaje recibido
        const data = JSON.parse(sc.decode(msg.data));

        // Llamar al método para crear el persona
        const newItem = await personasController.createItemFromNats(data);

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