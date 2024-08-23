class PersonasRepository {

    constructor({ Persona }) {
        this.Persona = Persona;
    }

    async getItems() {
        const items = await this.Persona.findAll();
        return items;
    }

    async getItemById(id) {
        const item = await this.Persona.findByPk(id);
        return item;
    }

    async createItem(data) {
        return this.Persona.create(data);
    }

    async updateItem(id, data) {
        const item = await this.Persona.findByPk(id);
        if (!item) {
            return null;
        }
        return item.update(data);
    }

    async deleteItem(id) {
        const item = await this.Persona.findByPk(id);
        if (!item) {
            return null;
        }
        return item.destroy();
    }

}

module.exports = PersonasRepository;