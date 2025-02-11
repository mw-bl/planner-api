'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Atividade = sequelize.define('Atividade', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    dataAtividade: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    viagemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Atividade.associate = (models) => {
    Atividade.belongsTo(models.Viagem, {
      foreignKey: 'viagemId',
      as: 'viagem',
    });
  };

  return Atividade;
};