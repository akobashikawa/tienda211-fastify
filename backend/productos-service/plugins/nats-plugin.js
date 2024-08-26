const fp = require('fastify-plugin');
const { connect, StringCodec } = require('nats');

const NATS_URL = process.env.NATS_URL || 'nats://localhost:4222';
let natsClient ;
const sc = StringCodec();

async function natsPlugin(fastify, options) {

    const connectToNATS = async () => {
        if (!natsClient ) {
            natsClient  = await connect({ servers: NATS_URL });
            fastify.log.info(`NATS_URL: ${NATS_URL}`);
        }
        return { natsClient , StringCodec };
    };

    const nats = await connectToNATS();
    fastify.decorate('natsClient', natsClient);
    fastify.decorate('natsStringCodec', sc);

    fastify.addHook('onClose', (fastifyInstance, done) => {
        natsClient.close();
        done();
    });
}

module.exports = fp(natsPlugin);