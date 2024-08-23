class ProductosController {
    constructor({ productosService }) {
        this.productosService = productosService;
    }

    async getItems(request, reply) {
        try {
            const items = await this.productosService.getItems();
            reply.send(items);
        } catch (error) {
            request.log.error(error);
            reply.code(500).send({ error: error.message });
        }
    }

    async getItemById(request, reply) {
        try {
            const id = request.params.id;
            const item = await this.productosService.getItemById(id);
            if (item) {
                reply.send(item);
            } else {
                reply.status(404).send({ error: 'Producto no encontrado' });
            }
        } catch (error) {
            request.log.error(error);
            reply.code(500).send({ error: error.message });
        }
    }

    async createItem(request, reply) {
        try {
            const { nombre, precio, costo, cantidad } = request.body;

            if (!nombre || precio < 0) {
                reply.code(400).send({ error: 'Datos inválidos' });
                return;
            }

            const newItem = await this.productosService.createItem({ nombre, precio, costo, cantidad });
            reply.code(201).send(newItem);
        } catch (error) {
            request.log.error(error);
            reply.code(500).send({ error: error.message });
        }
    }

    async updateItem(request, reply) {
        try {
            const { id } = request.params;

            const producto = await this.productosService.getItemById(id);

            if (!producto) {
                reply.status(404).send({ error: 'Producto no encontrado' });
                return;
            }

            const updatedFields = request.body;

            if ((updatedFields.nombre && !updatedFields.nombre) || (updatedFields.precio && updatedFields.precio < 0)) {
                reply.code(400).send({ error: 'Datos inválidos' });
                return;
            }

            const allowedFields = ['nombre', 'costo', 'precio', 'cantidad'];

            const filteredFields = {};

            for (let key of Object.keys(updatedFields)) {
                if (allowedFields.includes(key)) {
                    filteredFields[key] = updatedFields[key];
                }
            }

            const updatedItem = await this.productosService.updateItem(id, filteredFields);
            reply.send(updatedItem);
        } catch (error) {
            request.log.error(error);
            reply.code(500).send({ error: error.message });
        }
    }

    async deleteItem(request, reply) {
        try {
            const id = request.params.id;

            const result = await this.productosService.deleteItem(id);
            if (result) {
                reply.code(200).send({ message: 'Producto eliminado exitosamente' });
            } else {
                reply.status(404).send({ error: 'Producto no encontrado' });
            }
        } catch (error) {
            request.log.error(error);
            reply.code(500).send({ error: error.message });
        }
    }
}

module.exports = ProductosController;
