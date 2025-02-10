'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Destino = sequelize.define('Destino', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    pais: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cidade: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

Destino.associate = (models) => {
    Destino.hasMany(models.Viagem, {
        foreignKey: 'destinoId',
    });
};

return Destino;
};