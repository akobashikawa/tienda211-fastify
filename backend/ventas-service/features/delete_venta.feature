# language: es
Característica: Eliminar venta

  Escenario: Eliminar una venta existente
    Dado que el servicio está corriendo
    Y que existe una venta con id 1
    Cuando hago una solicitud DELETE a "/api/ventas/1"
    Entonces debería recibir una respuesta con un código de estado 200
    Y la venta con id 1 ya no debería existir en la base de datos
    Y la respuesta debería contener el mensaje "Venta eliminada exitosamente"

  Escenario: Eliminar una venta inexistente
    Dado que el servicio está corriendo
    Y que no existe una venta con id 9999
    Cuando hago una solicitud DELETE a "/api/ventas/9999"
    Entonces debería recibir una respuesta con un código de estado 404
    Y la respuesta debería contener el mensaje de error "Venta no encontrada"
