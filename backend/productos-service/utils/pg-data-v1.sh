#!/bin/bash

docker run --name my-postgres-db \
    -e POSTGRES_USER=myuser \
    -e POSTGRES_PASSWORD=mypassword \
    -e POSTGRES_DB=tienda211 \
    -p 5432:5432 \
    -v $(pwd)/data-v1:/var/lib/postgresql/data \
    -d postgres