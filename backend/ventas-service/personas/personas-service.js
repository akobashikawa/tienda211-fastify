const axios = require('axios');

class PersonasService {

    constructor({ fastify, url }) {
        this.nats = fastify.nats;
        this.url = url;
    }

    async getItems() {
        try {
            const { data: item } = await axios.get(`${this.url}`);;
            return item;
        } catch (error) {
            return null;
        }
        // return this.nats.getSingleResponse({ 
        //     subject: 'persona.getAll'
        // });
    }

    async getItemById(id) {
        try {
            const { data: item } = await axios.get(`${this.url}/${id}`);;
            return item;
        } catch (error) {
            return null;
        }
        // return this.nats.getSingleResponse({ 
        //     subject: 'persona.getById', 
        //     data: JSON.stringify({ id }),
        // });
    }

    async createItem(data) {
        try {
            const response = await axios.post(`${this.url}/${id}`, data);;
            return response.data;
        } catch (error) {
            return null;
        }
        // return this.nats.getSingleResponse({ 
        //     subject: 'persona.create', 
        //     data: JSON.stringify(data),
        // });
    }

    async updateItem(id, data) {
        try {
            const response = await axios.delete(`${this.url}/${id}`, data);;
            return response.data;
        } catch (error) {
            return null;
        }
        // return this.nats.getSingleResponse({ 
        //     subject: 'persona.update', 
        //     data: JSON.stringify({id, ...data}),
        // });
    }

}

module.exports = PersonasService;