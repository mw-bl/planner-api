export default (sequelize, DataTypes) => {
  const UserViagem = sequelize.define("UserViagem", {
    viagemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Viagem",
        key: "id",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
    },
    confirmada: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  return UserViagem;
};