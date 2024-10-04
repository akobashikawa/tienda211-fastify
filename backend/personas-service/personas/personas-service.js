class PersonasService {

    constructor({ fastify, personasRepository }) {
        this.personasRepository = personasRepository;
        this.nats = fastify.nats;
    }

    ping() {
        return 'pong';
    }

    async getItems() {
        return this.personasRepository.getItems();
    }

    async getItemById(id) {
        return this.personasRepository.getItemById(id);
    }

    async createItem(data) {
        const newItem = await this.personasRepository.createItem(data);
        
        // Publicar el evento en NATS
        const payload = { personaId: newItem.id };
        this.nats.publish('persona.created', JSON.stringify(payload));
        
        return newItem;
    }

    async updateItem(id, data) {
        const updatedItem = await this.personasRepository.updateItem(id, data);
        
        // Publicar el evento en NATS
        const payload = { personaId: updatedItem.id };
        this.nats.publish('persona.updated', JSON.stringify(payload));
        
        return updatedItem;
    }

    async deleteItem(id) {
        return this.personasRepository.deleteItem(id);
    }

}

module.exports = PersonasService;