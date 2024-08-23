# language: es
Característica: Obtener ventas

  Escenario: Obtener todas las ventas
    Dado que el servicio está corriendo
    Cuando hago una solicitud GET a "/api/ventas"
    Entonces debería recibir una respuesta con un código de estado 200
    Y la respuesta debería contener una lista de ventas

  Escenario: Obtener una venta existente
    Dado que el servicio está corriendo
    Y que existe una venta con id 1
    Cuando hago una solicitud GET a "/api/ventas/1"
    Entonces debería recibir una respuesta con un código de estado 200
    Y la respuesta debería contener una venta con el id 1

  Escenario: Obtener una venta inexistente
    Dado que el servicio está corriendo
    Y que no existe una venta con id 9999
    Cuando hago una solicitud GET a "/api/ventas/9999"
    Entonces debería recibir una respuesta con un código de estado 404
    Y la respuesta debería contener el mensaje de error "Venta no encontrada"