const { DataTypes, Model } = require('sequelize');

class Producto extends Model {

    static init(sequelize) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            nombre: {
                type: DataTypes.STRING,
                allowNull: false
            },
            costo: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                defaultValue: 0
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
        }, {
            sequelize,
            modelName: 'Producto',
            tableName: 'Productos',
        });
    }
}

module.exports = Producto;