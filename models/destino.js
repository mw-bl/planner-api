'use strict';

import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Destino = sequelize.define("Destino", {
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
  });

  Destino.associate = function (models) {  
    Destino.belongsTo(models.Viagem, {
      foreignKey: "viagemId"
    });
  };
  
  return Destino;
};
