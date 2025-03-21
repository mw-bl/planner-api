import { Model } from "sequelize";
import bcrypt from "bcrypt";

import { DataTypes } from "sequelize";

export default (sequelize) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Viagem, {
        foreignKey: "userId",
      });
      User.belongsToMany(models.Viagem, {
        through: "UserViagem", // Nome da tabela intermediária
        foreignKey: "userId",
        otherKey: "viagemId",
        as: "viagems", // Alias para acessar as viagens do usuário
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
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
      },
    }
  );

  return User;
};
