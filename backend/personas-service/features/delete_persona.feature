# language: es
Característica: Eliminar persona

  Escenario: Eliminar una persona existente
    Dado que el servicio está corriendo
    Y que existe una persona con id 1
    Cuando hago una solicitud DELETE a "/api/personas/1"
    Entonces debería recibir una respuesta con un código de estado 200
    Y la persona con id 1 ya no debería existir en la base de datos
    Y la respuesta debería contener el mensaje "Persona eliminada exitosamente"

  Escenario: Eliminar una persona inexistente
    Dado que el servicio está corriendo
    Y que no existe una persona con id 9999
    Cuando hago una solicitud DELETE a "/api/personas/9999"
    Entonces debería recibir una respuesta con un código de estado 404
    Y la respuesta debería contener el mensaje de error "Persona no encontrada"
