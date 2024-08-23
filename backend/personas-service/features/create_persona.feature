# language: es
Característica: Crear persona

  Escenario: Crear una nueva persona exitosamente
    Dado que el servicio está corriendo
    Cuando hago una solicitud POST a "/api/personas" con el siguiente cuerpo:
      """
      {
      "nombre": "Ana"
      }
      """
    Entonces debería recibir una respuesta con un código de estado 201
    Y la respuesta debería contener una persona con el nombre "Ana"
