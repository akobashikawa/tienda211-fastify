const { StringCodec } = require('nats');
const sc = StringCodec();

class ProductosService {

    constructor({ natsClient }) {
        this.natsClient = natsClient;
    }

    async getItems() {
        return new Promise((resolve, reject) => {
            const inbox = this.natsClient.subscribe('producto.getAll.response');

            // Suscripción para recibir la respuesta
            const subscription = this.natsClient.subscribe(inbox.subject, {
                callback: (err, msg) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(JSON.parse(sc.decode(msg.data)));
                },
            });

            // Publicar el mensaje en NATS
            this.natsClient.publish('producto.getAll', sc.encode(''), { reply: inbox.subject });

            // Timeout por si no se recibe respuesta
            setTimeout(() => {
                subscription.unsubscribe();
                reject(new Error('Timeout waiting for response from productos-service'));
            }, 5000); // 5 segundos de espera
        });
    }

    async getItemById(id) {
        try {
            const response = await axios.get(`${this.url}/${id}`);;
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async createItem(data) {
        return new Promise((resolve, reject) => {
            // Crear un inbox para recibir la respuesta
            const inbox = this.natsClient.subscribe('producto.create.response');

            // Suscribirse al inbox para recibir la respuesta
            const subscription = this.natsClient.subscribe(inbox.subject, {
                max: 1, // Solo queremos una respuesta
                callback: (err, msg) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    const response = JSON.parse(sc.decode(msg.data));
                    if (response.error) {
                        reject(new Error(response.error));
                    } else {
                        resolve(response);
                    }
                }
            });

            // Publicar el evento para crear el producto
            this.natsClient.publish('producto.create', sc.encode(JSON.stringify(data)), { reply: inbox.subject });

            // Timeout por si no se recibe respuesta
            setTimeout(() => {
                subscription.unsubscribe();
                reject(new Error('Timeout waiting for response from productos-service'));
            }, 5000); // 5 segundos de espera
        });
    }

    async updateItem(id, data) {
        try {
            const response = await axios.put(`${this.url}/${id}`, data);;
            return response.data;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = ProductosService;