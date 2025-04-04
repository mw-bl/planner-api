import { Model } from "sequelize";
import bcrypt from "bcrypt";

import { DataTypes } from "sequelize";

export default (sequelize) => {
  class User extends Model {
    static associate(models) {
      // Associações com aliases claros
      User.hasMany(models.Viagem, {
        foreignKey: "userId",
        as: "viagensOrganizadas", // Alias para viagens organizadas pelo usuário
      });
      User.belongsToMany(models.Viagem, {
        through: "UserViagem", // Nome da tabela intermediária
        foreignKey: "userId",
        otherKey: "viagemId",
        as: "viagensParticipadas", // Alias para viagens em que o usuário participa
      });
    }
  }

  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("organizador", "convidado"), // Alinha com os valores do banco de dados
        allowNull: false, // Torna o campo obrigatório
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: async (user) => {
          console.log("Senha antes de criptografar:", user.password);
          if (user.password) {
            console.log("Criptografando senha para o usuário:", user.email);
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },        
      },
    }
  );

  return User;
};
