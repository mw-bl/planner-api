'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Contem = sequelize.define('Contem', {
    linksId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    viagemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Contem.associate = (models) => {
    Contem.belongsTo(models.Links, {
      foreignKey: 'linksId',
      as: 'links',
    });

    Contem.belongsTo(models.Viagem, {
      foreignKey: 'viagemId',
      as: 'viagem',
    });
  };

  return Contem;
};
