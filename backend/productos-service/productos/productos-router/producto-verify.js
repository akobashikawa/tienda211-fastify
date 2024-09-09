module.exports = function (fastify, productosController) {

    // Suscripción a mensajes NATS
    const nc = fastify.nats.nc;
    const sc = fastify.nats.sc;

    // Suscribirse al evento
    const subscription = nc.subscribe('producto.verify');
    (async () => {
        for await (const msg of subscription) {
            console.log('producto.verify');
            try {
                const { producto_id, cantidad } = JSON.parse(sc.decode(msg.data));
                const producto = await productosController.getItemByIdFromNats(id);
                if (producto.cantidad < cantidad) {
                    nc.publish(msg.reply, sc.encode(JSON.stringify({ error: 'No hay suficientes existencias' })));
                    return;
                }
                // Actualizar la cantidad del producto
                producto.cantidad -= cantidad;
                await productosController.updateItemFromNats(producto_id, producto);

                nc.publish(msg.reply, sc.encode(JSON.stringify({ producto })));
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