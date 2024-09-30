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