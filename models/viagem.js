'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Viagem = sequelize.define('Viagem', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    dataCriacao: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dataInicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dataFinal: {
      type: DataTypes.DATE,
    },
    confirmada: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    confirmacao: {
      type: DataTypes.STRING,
    },
    organizador: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    destinoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Viagem.associate = (models) => {
    Viagem.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });

    Viagem.belongsTo(models.Destino, {
      foreignKey: 'destinoId',
      as: 'destino',
    });

    Viagem.hasMany(models.Atividade, {
      foreignKey: 'viagemId',
      as: 'atividades',
    });

    Viagem.hasMany(models.Link, {
      foreignKey: 'viagemId',
      as: 'links',
    });
  };

  return Viagem;
};