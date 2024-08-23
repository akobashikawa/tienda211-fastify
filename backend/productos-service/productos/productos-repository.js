class ProductosRepository {

    constructor({ Producto }) {
        this.Producto = Producto;
    }

    async getItems() {
        const items = await this.Producto.findAll();
        return items;
    }

    async getItemById(id) {
        const item = await this.Producto.findByPk(id);
        return item;
    }

    async createItem(data) {
        return this.Producto.create(data);
    }

    async updateItem(id, data) {
        const item = await this.Producto.findByPk(id);
        if (!item) {
            return null;
        }
        return item.update(data);
    }

    async deleteItem(id) {
        const item = await this.Producto.findByPk(id);
        if (!item) {
            return null;
        }
        return item.destroy();
    }

}

module.exports = ProductosRepository;