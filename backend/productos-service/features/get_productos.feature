# language: es
Característica: Obtener productos

  Escenario: Obtener todos los productos
    Dado que el servicio está corriendo
    Cuando hago una solicitud GET a "/api/productos"
    Entonces debería recibir una respuesta con un código de estado 200
    Y la respuesta debería contener una lista de productos

  Escenario: Obtener un producto existente
    Dado que el servicio está corriendo
    Y que existe un producto con id 1
    Cuando hago una solicitud GET a "/api/productos/1"
    Entonces debería recibir una respuesta con un código de estado 200
    Y la respuesta debería contener un producto con el id 1

  Escenario: Obtener un producto inexistente
    Dado que el servicio está corriendo
    Y que no existe un producto con id 9999
    Cuando hago una solicitud GET a "/api/productos/9999"
    Entonces debería recibir una respuesta con un código de estado 404
    Y la respuesta debería contener el mensaje de error "Producto no encontrado"