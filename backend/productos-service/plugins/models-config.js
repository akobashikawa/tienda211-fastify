const Producto = require('../productos/producto-model');
// const Venta = require('../ventas/venta-model');
// const Persona = require('../personas/persona-model');

module.exports = (sequelize) => {
    // Inicializar modelos
    Producto.init(sequelize);
    // Venta.init(sequelize);
    // Persona.init(sequelize);

    // // Definir las asociaciones

    // // Asociación Producto - Venta
    // Producto.hasMany(Venta, { foreignKey: 'producto_id' });
    // Venta.belongsTo(Producto, { foreignKey: 'producto_id' });

    // // Asociación Persona - Venta
    // Persona.hasMany(Venta, { foreignKey: 'persona_id' });
    // Venta.belongsTo(Persona, { foreignKey: 'persona_id' });

    return {
        Producto,
        // Persona,
        // Venta,
    }
};