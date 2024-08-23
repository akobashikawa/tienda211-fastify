const { DataTypes, Model } = require('sequelize');

class Persona extends Model {

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
        }, {
            sequelize,
            modelName: 'Persona',
            tableName: 'Personas',
        });
    }
}

module.exports = Persona;