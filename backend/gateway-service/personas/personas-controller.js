class PersonasController {
    constructor({ personasService }) {
        this.personasService = personasService;
    }

    async getItems(request, reply) {
        try {
            const items = await this.personasService.getItems();
            reply.send(items);
        } catch (error) {
            request.log.error(error);
            reply.code(500).send({ error: error.message });
        }
    }

    async getItemById(request, reply) {
        try {
            const id = request.params.id;
            const item = await this.personasService.getItemById(id);
            if (item) {
                reply.send(item);
            } else {
                reply.status(404).send({ error: 'Persona no encontrada' });
            }
        } catch (error) {
            request.log.error(error);
            reply.code(500).send({ error: error.message });
        }
    }

    async createItem(request, reply) {
        try {
            const { nombre } = request.body;

            if (!nombre) {
                reply.code(400).send({ error: 'Datos inválidos' });
                return;
            }

            const newItem = await this.personasService.createItem({ nombre });
            reply.code(201).send(newItem);
        } catch (error) {
            request.log.error(error);
            reply.code(500).send({ error: error.message });
        }
    }

    async updateItem(request, reply) {
        try {
            const { id } = request.params;

            const persona = await this.personasService.getItemById(id);

            if (!persona) {
                reply.status(404).send({ error: 'Persona no encontrada' });
                return;
            }

            const updatedFields = request.body;

            if (updatedFields.nombre && !updatedFields.nombre) {
                reply.code(400).send({ error: 'Datos inválidos' });
                return;
            }

            const allowedFields = ['nombre'];

            const filteredFields = {};

            for (let key of Object.keys(updatedFields)) {
                if (allowedFields.includes(key)) {
                    filteredFields[key] = updatedFields[key];
                }
            }

            const updatedItem = await this.personasService.updateItem(id, filteredFields);
            reply.send(updatedItem);
        } catch (error) {
            request.log.error(error);
            reply.code(500).send({ error: error.message });
        }
    }

    async deleteItem(request, reply) {
        try {
            const id = request.params.id;

            const result = await this.personasService.deleteItem(id);
            if (result) {
                reply.code(200).send({ message: 'Persona eliminada exitosamente' });
            } else {
                reply.status(404).send({ error: 'Persona no encontrada' });
            }
        } catch (error) {
            request.log.error(error);
            reply.code(500).send({ error: error.message });
        }
    }
}

module.exports = PersonasController;
