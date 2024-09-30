# Tienda211 - Fastify - Personas

## Hexagonal

- Un router invoca a controllers
- Un controller invoca services
- Un service invoca repositories y otros services
- Un repository usa models

- Los routers y controllers son parte de la interface web de usuario
- Puede haber equivalentes para interface de consola y otros
- Los repositories son parte de la interface de datos
- Los services contienen la business logic
- Los services idealmente son agnósticos a la interface de usuario y a la interface de datos

## curl

```sh
# get all personas
curl http://localhost:3002/api/personas

# create persona
curl -X POST http://localhost:3002/api/personas -H "Content-Type: application/json" -d '{"nombre": "Ana"}'

# get persona
curl http://localhost:3002/api/personas/1

# update persona
curl -X PUT http://localhost:3002/api/personas/1 -H "Content-Type: application/json" -d '{"nombre": "Betty"}'

# delete persona
curl -X DELETE http://localhost:3002/api/personas/1

```