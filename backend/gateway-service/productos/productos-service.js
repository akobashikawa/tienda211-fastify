class ProductosService {

    constructor({ fastify }) {
        this.nats = fastify.nats;
    }

    async getItems() {
        return this.nats.getSingleResponse({ 
            subject: 'producto.getAll'
        });
    }

    async getItemById(id) {
        return this.nats.getSingleResponse({ 
            subject: 'producto.getById', 
            data: JSON.stringify({ id }),
        });
    }

    async createItem(data) {
        return this.nats.getSingleResponse({ 
            subject: 'producto.create', 
            data: SON.stringify(data),
        });
    }

    async updateItem(id, data) {
        return this.nats.getSingleResponse({ 
            subject: 'producto.update', 
            data: JSON.stringify({id, ...data}),
        });
    }

}

module.exports = ProductosService;