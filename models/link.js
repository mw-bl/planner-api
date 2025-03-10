"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Link extends Model {
    static associate(models) {
      Link.belongsTo(models.Viagem, {
        foreignKey: "viagemId",
        as: "viagem",
      });
    }
  }

  Link.init(
    {
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
        references: {
          model: "viagens",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Links",
      tableName: "links",
    }
  );

  return Link;
};
