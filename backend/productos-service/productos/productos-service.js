class ProductosService {

    constructor({ productosRepository }) {
        this.productosRepository = productosRepository;
    }

    ping() {
        return 'pong';
    }

    async getItems() {
        return this.productosRepository.getItems();
    }

    async getItemById(id) {
        return this.productosRepository.getItemById(id);
    }

    async createItem(data) {
        return this.productosRepository.createItem(data);
    }

    async updateItem(id, data) {
        return this.productosRepository.updateItem(id, data);
    }

    async deleteItem(id) {
        return this.productosRepository.deleteItem(id);
    }

}

module.exports = ProductosService;