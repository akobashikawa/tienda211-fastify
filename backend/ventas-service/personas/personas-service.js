class PersonasService {

    constructor({ fastify }) {
        this.natsSingleResponse = fastify.natsSingleResponse;
    }

    async getItemById(id) {
        const subject = 'persona.getById';
        const encodedData = JSON.stringify({ id });
        return this.natsSingleResponse({ subject, data: encodedData });
    }

    async createItem(data) {
        const subject = 'persona.create';
        const encodedData = JSON.stringify(data);
        return this.natsSingleResponse({ subject, data: encodedData });
    }

}

module.exports = PersonasService;