const axios = require('axios');

class VentasService {

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
        //     subject: 'venta.getAll'
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
        //     subject: 'venta.getById', 
        //     data: JSON.stringify({ id }),
        // });
    }

    async createItem(data) {console.log(data)
        try {
            const response = await axios.post(`${this.url}`, data);;
            return response.data;
        } catch (error) {
            return null;
        }
        // return this.nats.getSingleResponse({ 
        //     subject: 'venta.create', 
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
        //     subject: 'venta.update', 
        //     data: JSON.stringify({id, ...data}),
        // });
    }

}

module.exports = VentasService;