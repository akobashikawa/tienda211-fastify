# language: es
Característica: Crear producto

  Escenario: Crear un nuevo producto exitosamente
    Dado que el servicio está corriendo
    Cuando hago una solicitud POST a "/api/productos" con el siguiente cuerpo:
      """
      {
      "nombre": "Producto Nuevo",
      "precio": 15,
      "costo": 10,
      "cantidad": 10
      }
      """
    Entonces debería recibir una respuesta con un código de estado 201
    Y la respuesta debería contener un producto con el nombre "Producto Nuevo" y precio 15
