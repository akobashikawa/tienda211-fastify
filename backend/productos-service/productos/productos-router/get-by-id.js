module.exports = function (fastify, productosController) {

    // Suscripción a mensajes NATS
    const natsClient = fastify.natsClient;
    const sc = fastify.natsStringCodec;

    // Suscribirse al evento 'producto.getAll'
    const subscription = natsClient.subscribe('producto.getById');
    (async () => {
        for await (const msg of subscription) {
            console.log('producto.getById');
            try {
                const { id } = JSON.parse(sc.decode(msg.data));
                const items = await productosController.getItemFromNats(id);
                natsClient.publish(msg.reply, sc.encode(JSON.stringify(items)));
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