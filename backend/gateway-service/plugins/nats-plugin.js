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

        const responsePromise = new Promise((resolve, reject) => {

            // Suscripción para recibir la respuesta
            subscription = natsClient.subscribe(responseSubject, {
                max: 1,
                callback: (err, msg) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    const response = JSON.parse(natsStringCodec.decode(msg.data));
                    if (response.error) {
                        reject(new Error(response.error));
                    } else {
                        resolve(response);
                    }
                },
            });

            // Publicar el mensaje en NATS
            natsClient.publish(subject, data, { reply: responseSubject });

        });

        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => {
                reject(new Error('Timeout waiting for response from productos-service'));
            }, timeout)
        );
        
        try {
            return await Promise.race([responsePromise, timeoutPromise]);
        } finally {
            if (subscription) {
                subscription.unsubscribe();
            }
        }
    }

    fastify.decorate('natsSingleResponse', natsSingleResponse);

    fastify.addHook('onClose', (fastifyInstance, done) => {
        natsClient.close();
        done();
    });
}

module.exports = fp(natsPlugin);