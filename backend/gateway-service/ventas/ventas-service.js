class VentasService {

    constructor({ fastify }) {
        this.nats = fastify.nats;
    }

    async getItems() {
        return this.nats.getSingleResponse({ 
            subject: 'venta.getAll'
        });
    }

    async getItemById(id) {
        return this.nats.getSingleResponse({ 
            subject: 'venta.getById', 
            data: JSON.stringify({ id }),
        });
    }

    async createItem(data) {
        return this.nats.getSingleResponse({ 
            subject: 'venta.create', 
            data: JSON.stringify(data),
        });
    }

    async updateItem(id, data) {
        return this.nats.getSingleResponse({ 
            subject: 'venta.update', 
            data: JSON.stringify({id, ...data}),
        });
    }

}

module.exports = VentasService;