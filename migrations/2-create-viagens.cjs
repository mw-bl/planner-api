"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Viagems", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      dataCriacao: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      dataInicio: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      dataFinal: {
        type: Sequelize.DATE,
      },
      confirmada: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      confirmacao: {
        type: Sequelize.STRING,
      },
      organizador: {
        type: Sequelize.STRING,
      },
