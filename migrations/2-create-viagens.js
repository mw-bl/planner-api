"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("viagens", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      dataCriacao: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      dataInicio: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      confirmada: {
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      dataFinal: {
        type: Sequelize.DATE,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      confirmacao: {
        type: Sequelize.STRING,
      },
      organizador: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("viagens");
  },
};
