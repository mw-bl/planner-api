"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Destino extends Model {
    static associate(models) {
      Destino.belongsTo(models.Viagens, {
        foreignKey: "viagemId",
        as: "viagem",
      });
    }
  }
  Destino.init(
    {
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
      modelName: "Destinos",
      tableName: "destinos",
    }
  );

  return Destino;
};
