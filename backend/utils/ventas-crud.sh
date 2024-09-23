echo getAll
curl http://localhost:3000/api/ventas

echo create
curl -X POST http://localhost:3000/api/ventas -H "Content-Type: application/json" -d '{"persona_id": 1, "producto_id": 1, "precio": 15, "cantidad": 1}'

echo getById
curl http://localhost:3000/api/ventas/1

echo update
curl -X PUT http://localhost:3000/api/ventas/1 -H "Content-Type: application/json" -d '{"cantidad": 3}'

echo getById
curl http://localhost:3000/api/ventas/1