const axios = require('axios');

class ProductosService {

    constructor({ url }) {
        this.url = url;
    }

    async getItems() {
        try {
            const response = await axios.get(`${this.url}`);;
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getItemById(id) {
        try {
            const response = await axios.get(`${this.url}/${id}`);;
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async createItem(data) {
        try {
            const response = await axios.post(`${this.url}`, data);;
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async updateItem(id, data) {
        try {
            const response = await axios.put(`${this.url}/${id}`, data);;
            return response.data;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = ProductosService;