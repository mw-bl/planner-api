'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Viagens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dataCriacao: {
        allowNull: false,
        type: Sequelize.DATE
      },
      dataInicio: {
        allowNull: false,
        type: Sequelize.DATE
      },
      dataFinal: {
        type: Sequelize.DATE
      },
      confirmada: {
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      confirmacao: {
        type: Sequelize.STRING
      },
      organizador: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      destinoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Destinos',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Viagens');
  }
};