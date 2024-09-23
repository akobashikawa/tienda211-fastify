echo getAll
curl http://localhost:3000/api/personas

echo create
curl -X POST http://localhost:3000/api/personas -H "Content-Type: application/json" -d '{"nombre": "Ana"}'

echo getById
curl http://localhost:3000/api/personas/1

echo update
curl -X PUT http://localhost:3000/api/personas/1 -H "Content-Type: application/json" -d '{"nombre": "Betty"}'

echo getById
curl -X DELETE http://localhost:3000/api/personas/1