"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Viagem extends Model {
    static associate(models) {
      Viagem.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });

      Viagem.hasOne(models.Destino, {
        foreignKey: "viagemId",
        as: "destino",
      });

      Viagem.hasMany(models.Atividade, {
        foreignKey: "viagemId",
        as: "atividades",
      });

      Viagem.hasMany(models.Link, {
        foreignKey: "viagemId",
        as: "links",
      });
    }
  }

  Viagem.init(
    {
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
      usuarId: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "id",
        },
      },
      confirmacao: {
        type: DataTypes.STRING,
      },
      organizador: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Viagem",
      tableName: "viagens",
    }
  );

  return Viagem;
};
