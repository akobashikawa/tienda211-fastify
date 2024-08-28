class ProductosService {

    constructor({ fastify }) {
        this.natsClient = fastify.natsClient;
        this.sc = fastify.natsStringCodec;
        this.natsSingleResponse = fastify.natsSingleResponse;
    }

    async getItems() {
        const subject = 'producto.getAll';
        return this.natsSingleResponse({ subject });
    }

    async getItemById(id) {
        const subject = 'producto.getById';
        const encodedData = JSON.stringify({ id });
        return this.natsSingleResponse({ subject, data: encodedData });
    }

    async createItem(data) {
        const subject = 'producto.create';
        const encodedData = JSON.stringify(data);
        return this.natsSingleResponse({ subject, data: encodedData });
    }

    async updateItem(id, data) {
        const subject = 'producto.update';
        const encodedData = JSON.stringify({id, ...data});
        return this.natsSingleResponse({ subject, data: encodedData });
    }

}

module.exports = ProductosService;