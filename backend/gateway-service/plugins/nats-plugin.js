const fp = require('fastify-plugin');
const { connect, StringCodec } = require('nats');

const NATS_URL = process.env.NATS_URL || 'nats://localhost:4222';
let nc;
const sc = StringCodec();

async function natsPlugin(fastify, options) {

    const connectToNATS = async () => {
        if (!nc) {
            nc = await connect({ servers: NATS_URL });
            fastify.log.info(`NATS_URL: ${NATS_URL}`);
        }
        return { nc, sc };
    };

    const nats = await connectToNATS();
    fastify.decorate('nats', nats);
}

module.exports = fp(natsPlugin);