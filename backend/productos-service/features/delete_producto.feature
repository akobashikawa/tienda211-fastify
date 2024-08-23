# language: es
Característica: Eliminar producto

  Escenario: Eliminar un producto existente
    Dado que el servicio está corriendo
    Y que existe un producto con id 1
    Cuando hago una solicitud DELETE a "/api/productos/1"
    Entonces debería recibir una respuesta con un código de estado 200
    Y el producto con id 1 ya no debería existir en la base de datos
    Y la respuesta debería contener el mensaje "Producto eliminado exitosamente"

  Escenario: Eliminar un producto inexistente
    Dado que el servicio está corriendo
    Y que no existe un producto con id 9999
    Cuando hago una solicitud DELETE a "/api/productos/9999"
    Entonces debería recibir una respuesta con un código de estado 404
    Y la respuesta debería contener el mensaje de error "Producto no encontrado"
