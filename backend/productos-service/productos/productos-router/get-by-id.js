module.exports = function (fastify, productosController) {

    // Suscripción a mensajes NATS
    const nc = fastify.nats.nc;
    const sc = fastify.nats.sc;

    // Suscribirse al evento
    const subscription = nc.subscribe('producto.getById');
    (async () => {
        for await (const msg of subscription) {
            console.log('producto.getById');
            try {
                const { id } = JSON.parse(sc.decode(msg.data));
                const item = await productosController.getItemByIdFromNats(id);
                nc.publish(msg.reply, sc.encode(JSON.stringify(item)));
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