class ProductosService {

    constructor({ fastify }) {
        this.natsSingleResponse = fastify.natsSingleResponse;
    }

    async getItems() {
        return this.natsSingleResponse({ 
            subject: 'producto.getAll'
        });
    }

    async getItemById(id) {
        return this.natsSingleResponse({ 
            subject: 'producto.getById', 
            data: JSON.stringify({ id }),
        });
    }

    async createItem(data) {
        return this.natsSingleResponse({ 
            subject: 'producto.create', 
            data: SON.stringify(data),
        });
    }

    async updateItem(id, data) {
        return this.natsSingleResponse({ 
            subject: 'producto.update', 
            data: JSON.stringify({id, ...data}),
        });
    }

}

module.exports = ProductosService;