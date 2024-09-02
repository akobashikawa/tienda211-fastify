class PersonasService {

    constructor({ fastify }) {
        this.nats = fastify.nats;
    }

    async getItems() {
        return this.nats.getSingleResponse({ 
            subject: 'persona.getAll'
        });
    }

    async getItemById(id) {console.log('ms ventas, personas-service, getItemById', id)
        return this.nats.getSingleResponse({ 
            subject: 'persona.getById', 
            data: JSON.stringify({ id }),
        });
    }

    async createItem(data) {
        return this.nats.getSingleResponse({ 
            subject: 'persona.create', 
            data: JSON.stringify(data),
        });
    }

    async updateItem(id, data) {
        return this.nats.getSingleResponse({ 
            subject: 'persona.update', 
            data: JSON.stringify({id, ...data}),
        });
    }

}

module.exports = PersonasService;