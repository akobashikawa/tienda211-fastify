const fp = require('fastify-plugin');
const { connect, StringCodec } = require('nats');

const NATS_URL = process.env.NATS_URL || 'nats://localhost:4222';
const natsStringCodec = StringCodec();

async function natsPlugin(fastify, options) {

    const natsClient = await connect({ servers: NATS_URL });
    fastify.log.info(`NATS_URL: ${NATS_URL}`);
    
    fastify.decorate('natsClient', natsClient);
    fastify.decorate('natsStringCodec', natsStringCodec);

    fastify.addHook('onClose', (fastifyInstance, done) => {
        natsClient.close();
        done();
    });
}

module.exports = fp(natsPlugin);