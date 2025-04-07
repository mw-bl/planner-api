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
        model: "User",
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
      through: "UserViagem",
      foreignKey: "viagemId",
      otherKey: "userId",
      as: "convidados",
    });
    Viagem.hasMany(models.Atividade, { as: 'atividades', foreignKey: 'viagemId' });
  };

  

  return Viagem;
};
