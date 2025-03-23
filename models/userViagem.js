export default (sequelize, DataTypes) => {
    const UserViagem = sequelize.define("UserViagem", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users", // Nome da tabela de usuários
          key: "id",
        },
        allowNull: false,
      },
      viagemId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Viagems", // Nome da tabela de viagens
          key: "id",
        },
        allowNull: false,
      },
    });
}