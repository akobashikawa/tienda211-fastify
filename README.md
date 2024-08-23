# Tienda 401 - Fastify

- **Tienda 101 - Fastify** es la versión monolito
    - [akobashikawa/tienda101-fastify: Ejercicio de implementar una tienda. Fastify con BDD. Arquitectura hexagonal. Monolito.](https://github.com/akobashikawa/tienda101-fastify).

```mermaid
graph TD
    style Frontend stroke:teal
    style Productos stroke:#89c
    style Personas stroke:#89c 
    style Ventas stroke:#89c
    style database stroke:#d62
    
    subgraph Monolito
        direction LR
        Frontend
        Productos <--> database[(Database)]
        Personas <--> database[(Database)]
        Ventas <--> database[(Database)]
    end
    
    Frontend <--> Productos
    Frontend <--> Personas
    Frontend <--> Ventas
```

- **Tienda 201 - Fastify** es una versión con microservicios invocados directamente
    - Cada microservicio tiene su propia base de datos
    - Ventas invoca a Productos y Personas usando métodos services
    - El frontend invoca directamente a cada microservicio directamente
    - [akobashikawa/tienda201-fastify: Ejercicio de implementar una tienda. Fastify con BDD. Arquitectura hexagonal. Microservicios directos.](https://github.com/akobashikawa/tienda201-fastify)

```mermaid
graph LR
    style Frontend stroke:teal
    style Productos stroke:#89c
    style Personas stroke:#89c 
    style Ventas stroke:#89c
    style dbProductos stroke:#d62
    style dbPersonas stroke:#d62
    style dbVentas stroke:#d62
    
    Frontend
    
    subgraph Backend
        Productos <--> dbProductos[(DBProductos)]
        Personas <--> dbPersonas[(DBPersonas)]
        Ventas <--> dbVentas[(DBVentas)]
    end
    
    Frontend <--> Productos
    Frontend <--> Personas
    Frontend <--> Ventas
```

- **Tienda 301 - Fastify** es una versión con microservicios invocados a través de un gateway
    - Cada microservicio tiene su propia base de datos
    - Un service invoca a otros services por HTTP
    - El frontend invoca a un gateway y el gateway invoca a los microservicios
    - [akobashikawa/tienda301-fastify: Ejercicio de implementar una tienda. Fastify con BDD. Arquitectura hexagonal. Microservicios con Gateway.](https://github.com/akobashikawa/tienda301-fastify)

```mermaid
graph LR
    style Frontend stroke:teal
    style Frontend stroke:#89c
    style Productos stroke:#89c
    style Personas stroke:#89c 
    style Ventas stroke:#89c
    style dbProductos stroke:#d62
    style dbPersonas stroke:#d62
    style dbVentas stroke:#d62
    
    Frontend
    
    subgraph Backend
        Gateway
        Productos <--> dbProductos[(DBProductos)]
        Personas <--> dbPersonas[(DBPersonas)]
        Ventas <--> dbVentas[(DBVentas)]
    end
    
    Frontend <--> Gateway
    Gateway <--> Productos
    Gateway <--> Personas
    Gateway <--> Ventas
```

- **Tienda 401 - Fastify** es una versión con microservicios comunicándose a través de NATS
    - Cada microservicio tiene su propia base de datos
    - El frontend invoca a un gateway y el gateway se comunica con los microservicios a través de NATS
    - Un service puede invocar a otros services también por HTTP

```mermaid
graph LR
    style Frontend stroke:teal
    style NATS stroke:lime
    style Productos stroke:#89c
    style Personas stroke:#89c 
    style Ventas stroke:#89c
    style dbProductos stroke:#d62
    style dbPersonas stroke:#d62
    style dbVentas stroke:#d62
    
    Frontend
    
    NATS(NATS)

    subgraph Backend
        Gateway
        Productos <--> dbProductos[(DBProductos)]
        Personas <--> dbPersonas[(DBPersonas)]
        Ventas <--> dbVentas[(DBVentas)]
    end

    Frontend <--> Gateway 
    NATS <--> Gateway
    NATS <--> Productos
    NATS <--> Personas
    NATS <--> Ventas
 
```

## Servicios

- **Gateway Service**
    - PORT: 3000

```sh
cd backend/gateway-service
npm install
npm test
npm run dev
```

- **Productos Service**
    - PORT: 3001

```sh
cd backend/productos-service
npm install
npm test
npm run dev
```

- **Personas Service**
    - PORT: 3002

```sh
cd backend/personas-service
npm install
npm test
npm run dev
```

- **Ventas Service**
    - PORT: 3003

```sh
cd backend/ventas-service
npm install
npm test
npm run dev
```

## Frontend

- Cada service tiene un frontend
- Para facilitar la prueba, el frontend del gateway es igual que el frontend general