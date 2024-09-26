const axios = require('axios');

class ProductosService {

    constructor({ fastify, url }) {
        this.nats = fastify.nats;
        this.url = url;
    }

    async getItems() {
        try {
            const response = await axios.get(`${this.url}`);;
            return response.data;
        } catch (error) {
            return null;
        }
        // return this.nats.getSingleResponse({ 
        //     subject: 'producto.getAll'
        // });
    }

    async getItemById(id) {
        try {
            const response = await axios.get(`${this.url}/${id}`);;
            return response.data;
        } catch (error) {
            return null;
        }
        // return this.nats.getSingleResponse({ 
        //     subject: 'producto.getById', 
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
        //     subject: 'producto.create', 
        //     data: JSON.stringify(data),
        // });
    }

    async updateItem(id, data) {
        try {
            const response = await axios.put(`${this.url}/${id}`, data);;
            return response.data;
        } catch (error) {
            return null;
        }
        // return this.nats.getSingleResponse({ 
        //     subject: 'producto.update', 
        //     data: JSON.stringify({id, ...data}),
        // });
    }

}

module.exports = ProductosService;