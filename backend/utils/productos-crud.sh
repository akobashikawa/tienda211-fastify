echo getAll
curl http://localhost:3000/api/productos

echo create
curl -X POST http://localhost:3000/api/productos -H "Content-Type: application/json" -d '{"nombre": "Producto Nuevo", "precio": 15, "costo": 10, "cantidad": 10}'

echo getById
curl http://localhost:3000/api/productos/1

echo update
curl -X PUT http://localhost:3000/api/productos/1 -H "Content-Type: application/json" -d '{"nombre": "Producto Actualizado", "precio": 20, "costo": 10, "cantidad": 5}'

echo getById
curl http://localhost:3000/api/productos/1