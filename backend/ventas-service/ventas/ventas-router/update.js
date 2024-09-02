module.exports = function (fastify, ventasController) {

  // Suscripción a mensajes NATS
  const nc = fastify.nats.nc;
  const sc = fastify.nats.sc;

  // Suscribirse al evento
  const subscription = nc.subscribe('venta.update');
  (async () => {
    for await (const msg of subscription) {
      console.log('venta.update');
      try {
        // Decodificar el mensaje recibido
        const data = JSON.parse(sc.decode(msg.data));
        const id = data.id;
        const updateData = {};
        if (data.producto_id) updateData.producto_id = data.producto_id;
        if (data.persona_id) updateData.persona_id = data.persona_id;
        if (data.precio) updateData.precio = data.precio;
        if (data.cantidad) updateData.cantidad = data.cantidad;

        // Llamar al método para crear el update
        const updatedItem = await ventasController.updateItemFromNats(id, updateData);

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