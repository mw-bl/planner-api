"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("destinos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      pais: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      estado: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      cidade: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      viagemId: {
        type: Sequelize.INTEGER,
        references: {
          model: "viagens",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
    await queryInterface.dropTable("destinos");
  },
};
