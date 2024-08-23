curl -X POST http://localhost:3001/api/productos -H "Content-Type: application/json" -d '{"nombre": "Producto Nuevo", "precio": 15, "costo": 10, "cantidad": 10}'
curl -X POST http://localhost:3001/api/productos -H "Content-Type: application/json" -d '{"nombre": "Producto Bonito", "precio": 12, "costo": 8, "cantidad": 10}'
curl -X POST http://localhost:3001/api/productos -H "Content-Type: application/json" -d '{"nombre": "Producto Barato", "precio": 5, "costo": 2, "cantidad": 10}'

curl -X POST http://localhost:3002/api/personas -H "Content-Type: application/json" -d '{"nombre": "Ana"}'
curl -X POST http://localhost:3002/api/personas -H "Content-Type: application/json" -d '{"nombre": "Betty"}'
curl -X POST http://localhost:3002/api/personas -H "Content-Type: application/json" -d '{"nombre": "Carmen"}'

curl -X POST http://localhost:3003/api/ventas -H "Content-Type: application/json" -d '{"persona_id": 1, "producto_id": 1, "precio": 15, "cantidad": 1}'