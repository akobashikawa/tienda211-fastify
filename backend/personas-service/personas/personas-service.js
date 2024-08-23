class PersonasService {

    constructor({ personasRepository }) {
        this.personasRepository = personasRepository;
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
        return this.personasRepository.createItem(data);
    }

    async updateItem(id, data) {
        return this.personasRepository.updateItem(id, data);
    }

    async deleteItem(id) {
        return this.personasRepository.deleteItem(id);
    }

}

module.exports = PersonasService;