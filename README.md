# Tienda 401 - Fastify

## **Tienda 101 - Fastify**
- Es la versión monolito
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

- GET /api/productos

```mermaid
sequenceDiagram
    participant Cliente
    participant Backend

    Cliente->>+Backend: GET /api/productos

    Backend->>Backend: productos.getAll
    Backend->>+Cliente: productos

```

- GET /api/ventas

```mermaid
sequenceDiagram
    participant Cliente
    participant Backend

    Cliente->>+Backend: GET /api/ventas

    Backend->>Backend: ventas.getAll
    Backend->>+Cliente: ventas

```

## **Tienda 201 - Fastify**
- Es una versión con microservicios invocados directamente
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

- GET /api/productos

```mermaid
sequenceDiagram
    participant Cliente
    participant MS_Productos as Productos

    Cliente->>+MS_Productos: GET /api/productos

    MS_Productos->>MS_Productos: getItems
    MS_Productos->>+Cliente: productos

```

- GET /api/ventas

```mermaid
sequenceDiagram
    participant Cliente
    participant MS_Ventas as Ventas
    participant MS_Productos as Productos
    participant MS_Personas as Personas

    Cliente->>+MS_Ventas: GET /api/ventas
    MS_Ventas->>MS_Ventas: getItems
    MS_Ventas->>MS_Productos: GET /api/productos/venta.producto_id
    MS_Productos->>MS_Ventas: producto
    MS_Ventas->>MS_Personas: GET /api/personas/venta.persona_id
    MS_Personas->>MS_Ventas: persona

    MS_Ventas->>+Cliente: ventas

```

## **Tienda 301 - Fastify**
- Es una versión con microservicios invocados a través de un gateway
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

- GET /api/productos

```mermaid
sequenceDiagram
    participant Cliente
    participant Gateway
    participant MS_Productos as Productos

    Cliente->>+Gateway: GET /api/productos
    Gateway->>+MS_Productos: GET /api/productos

    MS_Productos->>MS_Productos: getItems
    MS_Productos->>+Gateway: productos
    Gateway->>+Cliente: productos

```

- GET /api/ventas

```mermaid
sequenceDiagram
    participant Cliente
    participant Gateway
    participant MS_Ventas as Ventas
    participant MS_Productos as Productos
    participant MS_Personas as Personas

    Cliente->>+Gateway: GET /api/ventas
    Gateway->>+MS_Ventas: GET /api/ventas

    MS_Ventas->>MS_Ventas: getItems
    MS_Ventas->>MS_Productos: GET /api/productos/venta.producto_id
    MS_Productos->>MS_Ventas: producto
    MS_Ventas->>MS_Personas: GET /api/personas/venta.persona_id
    MS_Personas->>MS_Ventas: persona
    MS_Ventas->>+Gateway: ventas
    Gateway->>+Cliente: ventas

```

## **Tienda 401 - Fastify**
- Es una versión con microservicios comunicándose a través de NATS
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

- GET /api/productos

```mermaid
sequenceDiagram
    participant Cliente
    participant Gateway
    participant NATS
    participant MS_Productos as Productos

    MS_Productos-->>+NATS: Subscribe productos.getAll
    Cliente->>+Gateway: GET /api/productos
    Gateway->>+NATS: Publish productos.getAll
    Gateway-->>+NATS: Subscribe productos.getAll.response
    NATS->>+MS_Productos: Forward productos.getAll

    MS_Productos->>MS_Productos: getAll
    MS_Productos->>+NATS: Publish productos.getAll.response

    NATS->>+Gateway: Forward productos.getAll.response
    Gateway->>+Cliente: productos

```

- GET /api/ventas

```mermaid
sequenceDiagram
    participant Cliente
    participant Gateway
    participant NATS
    participant MS_Ventas as Ventas
    participant MS_Productos as Productos
    participant MS_Personas as Personas

    MS_Ventas--xNATS: Subscribe venta.getAll
    MS_Productos--xNATS: Subscribe producto.getAll
    MS_Personas--xNATS: Subscribe persona.getAll

    Cliente->>Gateway: GET /api/ventas
    Gateway-)NATS: Publish venta.getAll
    Gateway--xNATS: Subscribe venta.getAll.response
    NATS->>MS_Ventas: Forward venta.getAll

    MS_Ventas->>MS_Ventas: getItems

    MS_Ventas-)NATS: Publish producto.getById
    MS_Ventas--xNATS: Subscribe producto.getById.response
    NATS->>MS_Productos: Forward producto.getById
    MS_Productos->>MS_Productos: getItemById
    MS_Productos-)NATS: Publish producto.getById.response
    NATS->>MS_Ventas: Forward producto.getById.response

    MS_Ventas-)NATS: Publish persona.getById
    MS_Ventas--xNATS: Subscribe persona.getById.response
    NATS->>MS_Personas: Forward persona.getById
    MS_Personas->>MS_Personas: getItemById
    MS_Personas-)NATS: Publish persona.getById.response
    NATS->>MS_Ventas: Forward persona.getById.response

    MS_Ventas-)NATS: Publish ventas.getAll.response

    NATS->>Gateway: Forward ventas.getAll.response
    Gateway->>Cliente: ventas

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

## TODO

- Revisar validaciones. Parece que se estuvieran duplicando.
- Revisar arquitectura. La parte donde el controlador se vuelve NATS.