class VentasService {

    constructor({ fastify }) {
        this.natsSingleResponse = fastify.natsSingleResponse;
    }

    async getItems() {
        const subject = 'venta.getAll';
        return this.natsSingleResponse({ subject });
    }

    async getItemById(id) {
        const subject = 'venta.getById';
        const encodedData = JSON.stringify({ id });
        return this.natsSingleResponse({ subject, data: encodedData });
    }

    async createItem(data) {
        const subject = 'venta.create';
        const encodedData = JSON.stringify(data);
        return this.natsSingleResponse({ subject, data: encodedData });
    }

    async updateItem(id, data) {
        const subject = 'venta.update';
        const encodedData = JSON.stringify({id, ...data});
        return this.natsSingleResponse({ subject, data: encodedData });
    }

}

module.exports = VentasService;