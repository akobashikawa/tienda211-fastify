const fp = require('fastify-plugin');
const { connect, StringCodec } = require('nats');

const NATS_URL = process.env.NATS_URL || 'nats://localhost:4222';
const natsStringCodec = StringCodec();

async function natsPlugin(fastify, options) {

    fastify.decorate('natsStringCodec', natsStringCodec);

    let natsClient = null;

    const natsConnect = async (NATS_URL) => {
        try {
            natsClient = await connect({ servers: NATS_URL });
            fastify.log.info(`NATS connection to ${NATS_URL}: OK`);
            return natsClient;
        } catch (error) {
            fastify.log.error(`NATS connection to ${NATS_URL}: ${error.message}`);
            return null;
        }
    };

    natsClient = await natsConnect(NATS_URL);

    fastify.decorate('natsClient', natsClient);
    
    fastify.addHook('onClose', (fastifyInstance, done) => {
        fastifyInstance.natsClient.close();
        done();
    });
}

module.exports = fp(natsPlugin);