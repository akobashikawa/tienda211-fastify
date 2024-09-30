async function productosNatsListener(fastify, options) {

    const { productosService } = fastify.services;
    const nc = fastify.nats.nc;
    const sc = fastify.nats.sc;

    nc.subscribe('venta.created', {
        callback: async (err, msg) => {
            if (err) {
                console.error('Error en el evento ventas.created:', err);
                return;
            }

            const payload = JSON.parse(sc.decode(msg.data));
            console.log('payload venta.created recibido:', payload);
            const { ventaId, productoId, cantidad } = payload;
            // console.log({ ventaId, productoId, cantidad });

            try {
                await productosService.decProductoCantidad(productoId, cantidad);
                console.log(`Cantidad de producto ${productoId} actualizada tras ventas.created`);
            } catch (error) {
                console.error(`Error actualizando producto ${productoId}:`, error.message);
            }
        }
    });

    nc.subscribe('venta.updated', {
        callback: async (err, msg) => {
            if (err) {
                console.error('Error en el evento ventas.updated:', err);
                return;
            }

            const payload = JSON.parse(sc.decode(msg.data));
            console.log('payload venta.updated recibido:', payload);

            const { ventaId, productoId, cantidad, cantidadAnterior } = payload;
            // console.log({ ventaId, productoId, cantidad, cantidadAnterior });

            try {
                await productosService.decProductoCantidad(productoId, cantidad, cantidadAnterior);
                console.log(`Cantidad de producto ${productoId} actualizada tras ventas.updated`);
            } catch (error) {
                console.error(`Error actualizando producto ${productoId}:`, error.message);
            }
        }
    });

}

module.exports = productosNatsListener;