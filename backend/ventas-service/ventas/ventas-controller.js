class VentasController {
    constructor({ ventasService, personasService, productosService }) {
        this.ventasService = ventasService;
        this.personasService = personasService;
        this.productosService = productosService;
    }

    async getItems(request, reply) {
        try {
            const items = await this.ventasService.getItems();
            reply.send(items);
        } catch (error) {
            request.log.error(error);
            reply.code(500).send({ error: error.message });
        }
    }

    async getItemsFromNats() {
        try {
            const items = await this.ventasService.getItems();
            return items;
        } catch (error) {
            throw error;
        }
    }

    async getItemById(request, reply) {
        try {
            const id = request.params.id;
            const item = await this.ventasService.getItemById(id);
            if (item) {
                reply.send(item);
            } else {
                reply.status(404).send({ error: 'Venta no encontrada' });
            }
        } catch (error) {
            request.log.error(error);
            reply.code(500).send({ error: error.message });
        }
    }

    async getItemFromNats(id) {
        try {
            const item = await this.ventasService.getItemById(id);
            return item;
        } catch (error) {
            throw error;
        }
    }

    async createItem(request, reply) {
        try {
            const { persona_id, producto_id, precio, cantidad } = request.body;

            if (!persona_id, !producto_id || precio < 0) {
                reply.code(400).send({ error: 'Datos inválidos' });
                return;
            }

            const newItem = await this.ventasService.createItem({ persona_id, producto_id, precio, cantidad });
            reply.code(201).send(newItem);
        } catch (error) {
            request.log.error(error);
            reply.code(500).send({ error: error.message });
        }
    }

    async createItemFromNats(data) {
        try {
            const newItem = await this.ventasService.createItem(data);
            return newItem;
        } catch (error) {
            throw error;
        }
    }

    async updateItem(request, reply) {
        try {
            const id = request.params.id;

            const venta = await this.ventasService.getItemById(id);
            if (!venta) {
                reply.status(404).send({ error: 'Venta no encontrada' });
                return;
            }

            const { persona_id, producto_id, precio, cantidad } = request.body;

            if (!persona_id, !producto_id || precio < 0) {
                reply.code(400).send({ error: 'Datos inválidos' });
                return;
            }

            const updatedItem = await this.ventasService.updateItem(id, { persona_id, producto_id, precio, cantidad });
            if (updatedItem) {
                reply.send(updatedItem);
                return;
            } else {
                reply.status(404).send({ error: 'Venta no encontrada' });
                return;
            }
        } catch (error) {
            request.log.error(error);
            reply.code(500).send({ error: error.message });
        }
    }

    async updateItemFromNats(id, data) {
        try {
            const updatedItem = await this.ventasService.updateItem(id, data);
            return updatedItem;
        } catch (error) {
            throw error;
        }
    }

    async deleteItem(request, reply) {
        try {
            const id = request.params.id;

            const result = await this.ventasService.deleteItem(id);
            if (result) {
                reply.code(200).send({ message: 'Venta eliminada exitosamente' });
            } else {
                reply.status(404).send({ error: 'Venta no encontrada' });
            }
        } catch (error) {
            request.log.error(error);
            reply.code(500).send({ error: error.message });
        }
    }
}

module.exports = VentasController;
