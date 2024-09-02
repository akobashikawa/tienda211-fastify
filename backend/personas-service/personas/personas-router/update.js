module.exports = function (fastify, personasController) {

  // Suscripción a mensajes NATS
  const nc = fastify.nats.nc;
  const sc = fastify.nats.sc;

  // Suscribirse al evento 'persona.createItem'
  const subscription = nc.subscribe('persona.update');
  (async () => {
    for await (const msg of subscription) {
      console.log('persona.update');
      try {
        // Decodificar el mensaje recibido
        const data = JSON.parse(sc.decode(msg.data));
        const id = data.id;
        const updateData = {};
        if (data.nombre) updateData.nombre = data.nombre;

        // Llamar al método para crear el persona
        const updatedItem = await personasController.updateItemFromNats(id, updateData);

        // Publicar la respuesta en NATS usando el reply-to del mensaje
        nc.publish(msg.reply, sc.encode(JSON.stringify(updatedItem)));
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