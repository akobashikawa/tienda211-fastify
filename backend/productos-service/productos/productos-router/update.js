module.exports = function (fastify, productosController) {

  // Suscripción a mensajes NATS
  const nc = fastify.nats.nc;
  const sc = fastify.nats.sc;

  // Suscribirse al evento
  const subscription = nc.subscribe('producto.update');
  (async () => {
    for await (const msg of subscription) {
      console.log('producto.update');
      try {
        // Decodificar el mensaje recibido
        const data = JSON.parse(sc.decode(msg.data));console.log('data', data)
        const id = data.id;
        const updateData = {};
        if (data.nombre) updateData.nombre = data.nombre;
        if (data.costo) updateData.costo = data.costo;
        if (data.precio) updateData.precio = data.precio;
        if (data.cantidad) updateData.cantidad = data.cantidad;

        // Llamar al método para actualizar el producto
        const updatedItem = await productosController.updateItemFromNats(id, updateData);

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