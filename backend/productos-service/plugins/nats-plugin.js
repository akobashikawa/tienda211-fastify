const fp = require('fastify-plugin');
const { connect, StringCodec } = require('nats');

async function natsPlugin(fastify, options) {

    const sc = StringCodec();

    const natsConnect = async function () {
        const NATS_URL = process.env.NATS_URL || 'nats://localhost:4222';
        try {
            const natsClient = await connect({ servers: NATS_URL });
            fastify.log.info(`NATS connection to ${NATS_URL}: OK`);
            return natsClient;
        } catch (error) {
            fastify.log.error(`NATS connection to ${NATS_URL}: ${error.message}`);
            return null;
        }
    };

    // Método para publicar y esperar respuesta
    const getSingleResponse = async function ({ subject, data = '', timeout = 5000 }) {
        let nc = this.nc;
        if (!nc) {
            this.nc = await this.connect();
            if (!nc) {
                throw new Error('NATS connection not ready');
            }
            nc = this.nc;
        }

        const responseSubject = `${subject}.response`;

        let subscription;

        try {
            const responsePromise = new Promise((resolve, reject) => {
                // Publicar el mensaje en NATS
                fastify.log.info(`Publishing message to ${subject} with reply subject ${responseSubject}`);
                nc.publish(subject, sc.encode(data), { reply: responseSubject });

                // Suscripción para recibir la respuesta
                fastify.log.info(`Creating subscription for ${responseSubject}`);
                subscription = nc.subscribe(responseSubject, {
                    max: 1,
                    callback: (err, msg) => {
                        if (err) {
                            fastify.log.error(`Error in subscription for ${responseSubject}: ${err.message}`);
                            reject(err);
                            return;
                        }
                        const response = JSON.parse(sc.decode(msg.data));
                        fastify.log.info(`Received message for ${responseSubject}`);
                        if (response && response.error) {
                            fastify.log.error(`Error response from ${responseSubject}: ${response.error}`);
                            reject(new Error(response.error));
                        } else {
                            resolve(response);
                        }
                    },
                });
            });

            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => {
                    fastify.log.warn(`Timeout waiting for response from ${responseSubject}`);
                    reject(new Error('Timeout waiting for response from productos-service'));
                }, timeout)
            );

            return await Promise.race([responsePromise, timeoutPromise]);

        } finally {
            if (subscription) {
                subscription.unsubscribe();
            }
        }
    };

    // Método para publicar sin esperar respuesta
    const publish = function (subject, data) {
        let nc = this.nc;
        if (!nc) {
            throw new Error('NATS connection not ready');
        }
        nc.publish(subject, sc.encode(data));
        fastify.log.info(`Published message to ${subject}`);
        console.log(data);
    };

    // Método para suscribirse a un tema
    const subscribe = function (subject, handler) {
        let nc = this.nc;
        if (!nc) {
            throw new Error('NATS connection not ready');
        }

        const subscription = nc.subscribe(subject, {
            callback: (err, msg) => {
                if (err) {
                    fastify.log.error(`Error in subscription to ${subject}: ${err.message}`);
                    return;
                }
                const payload = JSON.parse(sc.decode(msg.data));
                fastify.log.info(`Received payload from ${subject}`);
                handler(payload); // Ejecutar el handler proporcionado por el usuario
            },
        });

        fastify.log.info(`Subscribed to ${subject}`);
        return subscription;
    };

    fastify.decorate('nats', {
        nc: null,
        sc: sc,
        connect: natsConnect,
        getSingleResponse: getSingleResponse,
        publish: publish,       // Agregar método para publicar
        subscribe: subscribe,   // Agregar método para suscribirse
    });

    fastify.nats.nc = await fastify.nats.connect();

    fastify.addHook('onClose', (fastifyInstance, done) => {
        fastifyInstance.nats.nc.close();
        fastify.log.info('NATS connection closed');
        done();
    });
}

module.exports = fp(natsPlugin);
