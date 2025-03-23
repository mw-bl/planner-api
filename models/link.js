



export default (sequelize) => {
  const Link = sequelize.define("Link", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING,
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

 
  return Link;
};
