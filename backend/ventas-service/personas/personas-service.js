const axios = require('axios');

class PersonasService {

    constructor({ url }) {
        this.url = url;
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
            const response = await axios.post(`${this.url}/${id}`, data);;
            return response.data;
        } catch (error) {
            return null;
        }
    }

}

module.exports = PersonasService;