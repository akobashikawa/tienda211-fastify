#!/bin/bash

# Conectar al contenedor y vaciar las tablas
docker exec -i my-postgres-db psql -U myuser -d tienda211 <<EOF
TRUNCATE TABLE ventas, productos, personas RESTART IDENTITY CASCADE;
EOF
