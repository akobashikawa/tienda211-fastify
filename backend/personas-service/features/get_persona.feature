# language: es
Característica: Obtener personas

  Escenario: Obtener todos los personas
    Dado que el servicio está corriendo
    Cuando hago una solicitud GET a "/api/personas"
    Entonces debería recibir una respuesta con un código de estado 200
    Y la respuesta debería contener una lista de personas

  Escenario: Obtener una persona existente
    Dado que el servicio está corriendo
    Y que existe una persona con id 1
    Cuando hago una solicitud GET a "/api/personas/1"
    Entonces debería recibir una respuesta con un código de estado 200
    Y la respuesta debería contener una persona con el id 1

  Escenario: Obtener una persona inexistente
    Dado que el servicio está corriendo
    Y que no existe una persona con id 9999
    Cuando hago una solicitud GET a "/api/personas/9999"
    Entonces debería recibir una respuesta con un código de estado 404
    Y la respuesta debería contener el mensaje de error "Persona no encontrada"