# Tienda211 - Fastify - Ventas

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
# get all ventas
curl http://localhost:3003/api/ventas

# get venta
curl http://localhost:3003/api/ventas/1

# create venta
curl -X POST http://localhost:3003/api/ventas -H "Content-Type: application/json" -d '{"persona_id": 1, "producto_id": 1, "precio": 15, "cantidad": 1}'

# update venta
curl -X PUT http://localhost:3003/api/ventas/1 -H "Content-Type: application/json" -d '{"cantidad": 2}'

# delete venta
curl -X DELETE http://localhost:3003/api/ventas/1