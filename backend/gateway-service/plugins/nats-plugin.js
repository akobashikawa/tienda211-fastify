const fp = require('fastify-plugin');
const { connect, StringCodec } = require('nats');

const NATS_URL = process.env.NATS_URL || 'nats://localhost:4222';
const natsStringCodec = StringCodec();

async function natsPlugin(fastify, options) {

    const natsClient = await connect({ servers: NATS_URL });
    fastify.log.info(`NATS_URL: ${NATS_URL}`);
    
    fastify.decorate('natsClient', natsClient);
    fastify.decorate('natsStringCodec', natsStringCodec);

    const natsSingleResponse = async ({ subject, data = '', timeout = 5000 }) => {
        const responseSubject = `${subject}.response`;

        let subscription;

        try {
            const responsePromise = new Promise((resolve, reject) => {

                // Log cuando se crea la suscripción
                fastify.log.info(`Creating subscription for ${responseSubject}`);

                // Suscripción para recibir la respuesta
                subscription = natsClient.subscribe(responseSubject, {
                    max: 1,
                    callback: (err, msg) => {
                        if (err) {
                            fastify.log.error(`Error in subscription for ${responseSubject}: ${err.message}`);
                            reject(err);
                            return;
                        }
                        const response = JSON.parse(natsStringCodec.decode(msg.data));
                        fastify.log.info(`Received message for ${responseSubject}`);
                        if (response.error) {
                            fastify.log.error(`Error response from ${responseSubject}: ${response.error}`);
                            reject(new Error(response.error));
                        } else {
                            resolve(response);
                        }
                    },
                });

                // Publicar el mensaje en NATS
                fastify.log.info(`Publishing message to ${subject} with reply subject ${responseSubject}`);
                natsClient.publish(subject, data, { reply: responseSubject });
            });

            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => {
                    fastify.log.warn(`Timeout waiting for response from ${responseSubject}`);
                    reject(new Error('Timeout waiting for response from productos-service'));
                }, timeout)
            );
            
            return await Promise.race([responsePromise, timeoutPromise]);

        } finally {
            // Log cuando se cierra la suscripción
            if (subscription) {
                fastify.log.info(`Unsubscribing from ${responseSubject}`);
                subscription.unsubscribe();
            }
        }
    }

    fastify.decorate('natsSingleResponse', natsSingleResponse);

    fastify.addHook('onClose', (fastifyInstance, done) => {
        natsClient.close();
        fastify.log.info('NATS connection closed');
        done();
    });
}

module.exports = fp(natsPlugin);
