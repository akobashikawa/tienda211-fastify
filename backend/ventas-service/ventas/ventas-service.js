class VentasService {

    constructor({ ventasRepository, productosService, personasService }) {
        this.ventasRepository = ventasRepository;
        this.productosService = productosService;
        this.personasService = personasService;
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

    calcGanancia({costo, precio, cantidad}) {
        return cantidad * (precio - costo);
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

        if (producto.cantidad < 0) {
            throw new Error('No hay suficientes existencias');
        }
        if (producto.cantidad - data.cantidad < 0) {
            throw new Error('No hay suficientes existencias');
        }

        data.ganancia = this.calcGanancia({costo: producto.costo, precio: data.precio, cantidad: data.cantidad});

        const nuevaCantidad = producto.cantidad - data.cantidad;
        await this.productosService.updateItem(producto.id, {cantidad: nuevaCantidad});

        return this.ventasRepository.createItem(data);
    }

    async updateItem(id, data) {
        const venta = await this.getItemById(id);

        if (!venta) {
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

        if (producto.cantidad < 0) {
            throw new Error('No hay suficientes existencias');
        }
        if (producto.cantidad - data.cantidad < 0) {
            throw new Error('No hay suficientes existencias');
        }

        data.ganancia = this.calcGanancia({costo: producto.costo, precio: data.precio, cantidad: data.cantidad});

        const diferencia = data.cantidad - venta.cantidad;
        const nuevaCantidad = producto.cantidad - diferencia;
        await this.productosService.updateItem(producto.id, {cantidad: nuevaCantidad});

        return this.ventasRepository.updateItem(id, data);
    }

    async deleteItem(id) {
        return this.ventasRepository.deleteItem(id);
    }

}

module.exports = VentasService;