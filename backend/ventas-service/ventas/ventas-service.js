class VentasService {

    constructor({ fastify, ventasRepository, productosService, personasService }) {
        this.ventasRepository = ventasRepository;
        this.productosService = productosService;
        this.personasService = personasService;
        this.nats = fastify.nats; 
    }

    ping() {
        return 'pong';
    }

    async getItems() {
        const ventas = await this.ventasRepository.getItems();
        for (let venta of ventas) {
            venta.dataValues.Producto = await this.productosService.getItemById(venta.producto_id);
            venta.dataValues.Persona = await this.personasService.getItemById(venta.persona_id);
        }
        return ventas;
    }

    async getItemById(id) {
        const venta = await this.ventasRepository.getItemById(id);
        if (!venta) {
            return null;
        }
        venta.dataValues.Producto = await this.productosService.getItemById(venta.producto_id);
        venta.dataValues.Persona = await this.personasService.getItemById(venta.persona_id);
        return venta;
    }

    async createItem(data) {
        const persona = await this.personasService.getItemById(data.persona_id);

        if (!persona) {
            throw new Error('Persona no encontrada');
        }

        const producto = await this.productosService.getItemById(data.producto_id);

        if (!producto) {
            throw new Error('Producto no encontrado');
        }

        if (producto.cantidad < data.cantidad) {
            throw new Error('No hay suficientes existencias');
        }

        // Crear la venta
        const newVenta = await this.ventasRepository.createItem(data);

        // Publicar el evento de creación de venta en NATS
        const payload = { ventaId: newVenta.id, productoId: data.producto_id, cantidad: data.cantidad, precio: data.precio };
        this.nats.publish('venta.created', JSON.stringify(payload));

        return newVenta;
    }

    async updateItem(id, data) {
        const found = await this.getItemById(id);

        if (!found) {
            throw new Error('Venta no encontrada');
        }

        const persona = await this.personasService.getItemById(data.persona_id);

        if (!persona) {
            throw new Error('Persona no encontrada');
        }

        const producto = await this.productosService.getItemById(data.producto_id);

        if (!producto) {
            throw new Error('Producto no encontrado');
        }

        if (producto.cantidad < data.cantidad) {
            throw new Error('No hay suficientes existencias');
        }

        const cantidadAnterior = found.cantidad;

        const updatedVenta = this.ventasRepository.updateItem(id, data);

        // Publicar el evento de creación de venta en NATS
        const payload = { ventaId: updatedVenta.id, productoId: data.producto_id, cantidad: data.cantidad, precio: data.precio, cantidadAnterior };
        this.nats.publish('venta.updated', JSON.stringify(payload));

        return updatedVenta;
    }

    async deleteItem(id) {
        return this.ventasRepository.deleteItem(id);
    }

}

module.exports = VentasService;