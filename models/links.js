'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Links = sequelize.define('Links', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING,
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

  Links.associate = (models) => {
    Links.belongsTo(models.Viagem, {
      foreignKey: 'viagemId',
      as: 'viagem',
    });
  };

  return Links;
};
