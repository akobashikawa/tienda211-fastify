class ProductosService {

    constructor({ fastify, productosRepository }) {
        this.productosRepository = productosRepository;
        this.nats = fastify.nats;
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
        const newItem = await this.productosRepository.createItem(data);

        // Publicar el evento en NATS
        const payload = { productoId: newItem.id };
        this.nats.publish('producto.created', JSON.stringify(payload));

        return newItem;
    }

    async updateItem(id, data) {
        const updatedItem = await this.productosRepository.updateItem(id, data);

        // Publicar el evento en NATS
        const payload = { productoId: updatedItem.id };
        this.nats.publish('producto.updated', JSON.stringify(payload));

        return updatedItem;
    }

    async deleteItem(id) {
        return this.productosRepository.deleteItem(id);
    }

    async decProductoCantidad(productoId, cantidad, cantidadAnterior = 0) {
        const producto = await this.productosRepository.getItemById(productoId);
        if (!producto) throw new Error('Producto no encontrado: ' + productoId);

        if (producto.cantidad < cantidad) {
            throw new Error('Stock insuficiente para el producto: ' + productoId);
        }
    
        const diferencia = cantidad - cantidadAnterior;
        const nuevaCantidad = producto.cantidad - diferencia;
    
        producto.cantidad = nuevaCantidad;
        await this.productosRepository.updateItem(productoId, { cantidad: nuevaCantidad });
    }

}

module.exports = ProductosService;