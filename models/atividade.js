'use strict';

import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Atividade = sequelize.define("Atividade", {
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
      references: {
        model: "viagens",
        key: "id",
      },
    },
  });

  Atividade.associate = (models) => {
    Atividade.belongsTo(models.Viagem, {
      foreignKey: "viagemId"
    });
  };

  return Atividade;
};
