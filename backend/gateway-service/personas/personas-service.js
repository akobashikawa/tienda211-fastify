const axios = require('axios');

class PersonasService {

    constructor({ url }) {
        this.url = url;
    }

    async getItems() {
        try {
            const response = await axios.get(`${this.url}`);;
            return response.data;
        } catch (error) {
            return null;
        }
    }

    async getItemById(id) {
        try {
            const { data: item } = await axios.get(`${this.url}/${id}`);;
            return item;
        } catch (error) {
            return null;
        }
    }

    async createItem(data) {
        try {
            const response = await axios.post(`${this.url}`, data);;
            return response.data;
        } catch (error) {
            return null;
        }
    }

    async updateItem(id, data) {
        const response = await axios.put(`${this.url}/${id}`, data);;
        return response.data;
    }

}

module.exports = PersonasService;