# language: es
Característica: Actualizar persona

  Escenario: Actualizar un persona existente
    Dado que el servicio está corriendo
    Y que existe una persona con id 1
    Cuando hago una solicitud PUT a "/api/personas/1" con el siguiente payload:
      """
      {
      "nombre": "Ana María"
      }
      """
    Entonces debería recibir una respuesta con un código de estado 200
    Y la respuesta debería contener la persona con id 1 actualizado con nombre "Ana María"

  Escenario: Actualizar un persona inexistente
    Dado que el servicio está corriendo
    Y que no existe una persona con id 9999
    Cuando hago una solicitud PUT a "/api/personas/9999" con el siguiente payload:
      """
      {
      "nombre": "Ana María"
      }
      """
    Entonces debería recibir una respuesta con un código de estado 404
    Y la respuesta debería contener el mensaje de error "Persona no encontrada"
