module.exports = function (fastify, personasController) {

    // Suscripción a mensajes NATS
    const nc = fastify.nats.nc;
    const sc = fastify.nats.sc;

    // Suscribirse al evento
    const subscription = nc.subscribe('persona.verify');
    (async () => {
        for await (const msg of subscription) {
            console.log('persona.verify');
            try {
                const { persona_id } = JSON.parse(sc.decode(msg.data));
                const persona = await personasController.getItemByIdFromNats(persona_id);
                nc.publish(msg.reply, sc.encode(JSON.stringify(persona)));
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