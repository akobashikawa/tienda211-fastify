const { DataTypes, Model } = require('sequelize');

class Venta extends Model {

    static init(sequelize) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            producto_id: {
                type: DataTypes.INTEGER,
            },
            persona_id: {
                type: DataTypes.INTEGER,
            },
            precio: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                defaultValue: 0
            },
            cantidad: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            fecha_hora: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            },
        }, {
            sequelize,
            modelName: 'Venta',
            tableName: 'ventas',
            timestamps: false,
        });
    }

    // toJSON() {
    //     const values = super.toJSON();
    //     return {
    //         id: values.id,
    //         producto: values.Producto,
    //         persona: values.Persona,
    //         precio: values.precio,
    //         cantidad: values.cantidad,
    //         fecha_hora: values.fecha_hora
    //     };
    // }
}

module.exports = Venta;