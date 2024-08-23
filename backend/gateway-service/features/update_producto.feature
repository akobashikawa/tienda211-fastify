# language: es
Característica: Actualizar producto

  Escenario: Actualizar un producto existente
    Dado que el servicio está corriendo
    Y que existe un producto con id 1
    Cuando hago una solicitud PUT a "/api/productos/1" con el siguiente payload:
      """
      {
      "nombre": "Producto Actualizado",
      "precio": 16,
      "costo": 10,
      "cantidad": 12
      }
      """
    Entonces debería recibir una respuesta con un código de estado 200
    Y la respuesta debería contener el producto con id 1 actualizado con nombre "Producto Actualizado"

  Escenario: Actualizar un producto inexistente
    Dado que el servicio está corriendo
    Y que no existe un producto con id 9999
    Cuando hago una solicitud PUT a "/api/productos/9999" con el siguiente payload:
      """
      {
      "nombre": "Producto Actualizado",
      "precio": 16,
      "costo": 10,
      "cantidad": 12
      }
      """
    Entonces debería recibir una respuesta con un código de estado 404
    Y la respuesta debería contener el mensaje de error "Producto no encontrado"
