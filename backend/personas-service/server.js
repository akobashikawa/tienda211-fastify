const app = require('./app');

const PORT = process.env.PORT || 3000;
const NAME = process.env.NAME || 'SERVICE';

const start = async () => {
    try {
        await app.listen({ port: PORT, host: '0.0.0.0' });
        app.log.info(NAME);
        // app.log.info(`Server corriendo en http://localhost:${PORT}`);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

const stop = async () => {
    try {
        await app.close();
        app.log.info(`Server detenido http://localhost:${PORT}`);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

if (require.main === module) {
    start();
}

module.exports = { start, stop, app };