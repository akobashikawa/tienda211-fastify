const { BeforeAll, AfterAll, Before, After, Given, When, Then } = require('@cucumber/cucumber');
const { assertThat, is, not, containsString, hasProperty } = require('hamjest');
// const sinon = require('sinon');
// const puppeteer = require('puppeteer');
// const { app } = require('../../server');
const app = require('../../app');

let producto;

async function resetTableProductos() {
    await app.sequelize.query('DELETE FROM Productos');
    await app.sequelize.query('DELETE FROM sqlite_sequence WHERE name="Productos"');
    this.producto = await app.services.productosService.createItem({
        nombre: 'Producto Nuevo',
        costo: 10,
        precio: 15,
        cantidad: 10,
    });
}

BeforeAll(async function () {
    // browser = await puppeteer.launch();
    // page = await browser.newPage();
    // await resetTableProductos();
});

AfterAll(async function () {
    // await browser.close();
    await app.close();
});

Before(async function () {

});

After(async function() {
    
});

Given('que el servicio está corriendo', async function () {

});

When('hago una solicitud GET a {string}', async function (route) {
    // this.response = await page.goto(`http://localhost:3000${route}`, { waitUntil: 'networkidle0' });
    this.response = await app.inject({ url: `http://localhost:3001${route}` });
    this.responseBody = await this.response.json();
});

Then('debería recibir una respuesta con un código de estado {int}', function (statusCode) {
    // assertThat(this.response.status(), is(statusCode));
    assertThat(this.response.statusCode, is(statusCode));
});

Then('la respuesta debería contener una lista de productos', async function () {
    // const body = await this.response.text();
    // assertThat(body, containsString('productos'));
    assertThat(Array.isArray(this.responseBody), is(true));
});


Given('que existe un producto con id {int}', async function (id) {
    await resetTableProductos();
    const producto = await app.services.productosService.getItemById(id);
    assertThat(producto.id, id);
});

When('hago una solicitud POST a {string} con el siguiente cuerpo:', async function (route, body) {
    // this.response = await page.evaluate(async (route, body) => {
    //     const res = await fetch(`http://localhost:3000${route}`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body
    //     });
    //     const data = await res.json();
    //     return { status: res.status, body: data };
    // }, route, body);
    this.response = await app.inject({
        method: 'POST',
        url: route,
        payload: JSON.parse(body),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    this.responseBody = await this.response.json();
});

Then('la respuesta debería contener un producto con el nombre {string} y precio {float}', async function (nombre, precio) {
    assertThat(this.responseBody, hasProperty('nombre', nombre));
    assertThat(this.responseBody, hasProperty('precio', precio));
});


Then('la respuesta debería contener un producto con el id {int}', async function (id) {
    assertThat(this.responseBody, hasProperty('id', id));
});

Given('que no existe un producto con id {int}', async function (id) {
    try {
        await app.services.productosService.deleteItem(id);
    } catch(error) {}
    let producto = await app.services.productosService.getItemById(id);
    assertThat(producto, null);
});

When('hago una solicitud PUT a {string} con el siguiente payload:', async function (route, body) {
    this.response = await app.inject({
        method: 'PUT',
        url: route,
        payload: JSON.parse(body),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    this.responseBody = await this.response.json();
});

Then('la respuesta debería contener el producto con id {int} actualizado con nombre {string}', async function (id, nombre) {
    assertThat(this.responseBody, hasProperty('id', id));
    assertThat(this.responseBody, hasProperty('nombre', nombre));
});

When('hago una solicitud DELETE a {string}', async function (route) {
    this.response = await app.inject({
        method: 'DELETE',
        url: route,
    });
    this.responseBody = await this.response.json();
});

Then('el producto con id {int} ya no debería existir en la base de datos', async function (id) {
    const producto = await app.services.productosService.getItemById(id);;
    assertThat(producto, is(null));
});

Then('la respuesta debería contener el mensaje {string}', async function (message) {
    assertThat(this.responseBody, hasProperty('message', message));
});

Then('la respuesta debería contener el mensaje de error {string}', async function (message) {
    assertThat(this.responseBody, hasProperty('error', message));
});
