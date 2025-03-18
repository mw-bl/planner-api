import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Viagem = sequelize.define("Viagem", {
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
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    confirmacao: {
      type: DataTypes.STRING,
    },
    organizador: {
      type: DataTypes.STRING,
    },
  });

  Viagem.associate = (models) => {
    Viagem.belongsTo(models.User, {
      foreignKey: "userId",
      as : "user"
    });

    Viagem.hasOne(models.Destino, {
      foreignKey: "viagemId"
    });

    Viagem.hasMany(models.Atividade, {
      foreignKey: "viagemId",
    });

    Viagem.hasMany(models.Link, {
      foreignKey: "viagemId"
    });
  };

  return Viagem;
};
