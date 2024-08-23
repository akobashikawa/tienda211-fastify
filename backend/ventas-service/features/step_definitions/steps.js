const { BeforeAll, AfterAll, Before, After, Given, When, Then } = require('@cucumber/cucumber');
const { assertThat, is, not, containsString, hasProperty } = require('hamjest');
// const sinon = require('sinon');
// const puppeteer = require('puppeteer');
// const { app } = require('../../server');
const app = require('../../app');

async function resetTableProductos() {
    
}

async function resetTablePersonas() {
    
}

async function resetTableVentas() {
    await resetTableProductos();
    await resetTablePersonas();
    await app.sequelize.query('DELETE FROM Ventas');
    await app.sequelize.query('DELETE FROM sqlite_sequence WHERE name="Ventas"');
    this.venta = await app.services.ventasService.createItem({
        producto_id: 1,
        persona_id: 1,
        precio: 15,
        cantidad: 1,
    });
}

BeforeAll(async function () {
    // browser = await puppeteer.launch();
    // page = await browser.newPage();
});

AfterAll(async function () {
    // await browser.close();
    // await app.close();
});

Before(async function () {
    // await resetTable();
});

After(async function () {

});

Given('que el servicio está corriendo', async function () {

});

When('hago una solicitud GET a {string}', async function (route) {
    // this.response = await page.goto(`http://localhost:3000${route}`, { waitUntil: 'networkidle0' });
    this.response = await app.inject({ url: `http://localhost:3003${route}` });
    this.responseBody = await this.response.json();
});

Then('debería recibir una respuesta con un código de estado {int}', function (statusCode) {
    // assertThat(this.response.status(), is(statusCode));
    assertThat(this.response.statusCode, is(statusCode));
});

Then('la respuesta debería contener una lista de ventas', async function () {
    // const body = await this.response.text();
    // assertThat(body, containsString('ventas'));
    assertThat(Array.isArray(this.responseBody), is(true));
});

Given('que existe una venta con id {int}', async function (id) {
    await resetTableVentas();
    let venta = await app.services.ventasService.getItemById(id);
    assertThat(venta.id, id);
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

Then('la respuesta debería contener una venta con el producto_id {int} y precio {float}', async function (producto_id, precio) {
    assertThat(this.responseBody, hasProperty('producto_id', producto_id));
    assertThat(this.responseBody, hasProperty('precio', precio));
});

Then('la respuesta debería contener una venta con el id {int}', async function (id) {
    assertThat(this.responseBody, hasProperty('id', id));
});

Given('que no existe una venta con id {int}', async function (id) {
    let venta = await app.services.ventasService.getItemById(id);
    assertThat(venta, null);
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

Then('la respuesta debería contener la venta con id {int} actualizada con cantidad {int}', async function (id, cantidad) {
    assertThat(this.responseBody, hasProperty('id', id));
    assertThat(this.responseBody, hasProperty('cantidad', cantidad));
});

When('hago una solicitud DELETE a {string}', async function (route) {
    this.response = await app.inject({
        method: 'DELETE',
        url: route,
    });
    this.responseBody = await this.response.json();
});

Then('la venta con id {int} ya no debería existir en la base de datos', async function (id) {
    const venta = await app.services.ventasService.getItemById(id);;
    assertThat(venta, is(null));
});

Given('el producto con id {int} tiene una cantidad {int}', async function (id, cantidad) {
    await resetTableProductos();
    await app.services.productosService.updateItem(id, { cantidad });
});

Then('el producto con id {int} debería tener una cantidad {int}', async function (id, cantidad) {
    const producto = await app.services.productosService.getItemById(id);
    assertThat(producto.cantidad, cantidad);
});

Then('la respuesta debería contener el mensaje {string}', async function (message) {
    assertThat(this.responseBody, hasProperty('message', message));
});

Then('la respuesta debería contener el mensaje de error {string}', async function (message) {
    assertThat(this.responseBody, hasProperty('error', message));
});

Given('que existe un producto con id {int}', async function (int) {         // Given('que existe un producto con 
    await resetTableProductos();
});