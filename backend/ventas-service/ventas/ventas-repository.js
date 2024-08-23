class VentasRepository {

    constructor({ Venta }) {
        this.Venta = Venta;
    }

    async getItems() {
        const items = await this.Venta.findAll();
        return items;
    }

    async getItemById(id) {
        const item = await this.Venta.findByPk(id);
        return item;
    }

    async createItem(data) {
        return this.Venta.create(data);
    }

    async updateItem(id, data) {
        const item = await this.Venta.findByPk(id);
        if (item) {
            return await item.update(data);
        }
        return null;
    }

    async deleteItem(id) {
        const item = await this.Venta.findByPk(id);
        if (item) {
            return await item.destroy();
        }
        return null;
    }

}

module.exports = VentasRepository;