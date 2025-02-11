'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'João Silva',
        email: 'joao@email.com',
        password: '123456',
        type: 'organizador',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Maria Souza',
        email: 'maria@email.com',
        password: '654321',
        type: 'viajante',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Usuarios', null, {});
  }
};
