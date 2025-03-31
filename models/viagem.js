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
      defaultValue: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
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
  });

  Viagem.associate = (models) => {
    Viagem.belongsTo(models.User, {
      foreignKey: "userId",
      as: "organizador",
    });

    Viagem.belongsToMany(models.User, { 
      as: 'participants', 
      through: 'ViagemParticipants' });

    Viagem.hasMany(models.Atividade, {
      foreignKey: "viagemId",
    });

    
  };

  return Viagem;
};
