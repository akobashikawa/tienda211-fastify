async function productosNatsListener(fastify, options) {

    const { productosService } = fastify.services;
    const nats = fastify.nats;

    nats.subscribe('venta.created', async (payload) => {
        const { ventaId, productoId, cantidad } = payload;
        // console.log({ ventaId, productoId, cantidad });

        try {
            await productosService.decProductoCantidad(productoId, cantidad);
            console.log(`Cantidad de producto ${productoId} actualizada tras ventas.created`);
        } catch (error) {
            console.error(`Error actualizando producto ${productoId}:`, error.message);
        }
    });

    nats.subscribe('venta.updated', async (payload) => {
        const { ventaId, productoId, cantidad, cantidadAnterior } = payload;
        // console.log({ ventaId, productoId, cantidad, cantidadAnterior });

        try {
            await productosService.decProductoCantidad(productoId, cantidad, cantidadAnterior);
            console.log(`Cantidad de producto ${productoId} actualizada tras ventas.updated`);
        } catch (error) {
            console.error(`Error actualizando producto ${productoId}:`, error.message);
        }
    });

}

module.exports = productosNatsListener;