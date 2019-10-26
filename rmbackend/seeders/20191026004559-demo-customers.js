'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('customers', [{
        name: 'John Doe',
        identity_number: 'kmzwayw1aa',
        phone_number: '080809080707',
        image : 'aku.jpg',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name: 'Jogasdadwa',
        identity_number: 'kmzway87aa',
        phone_number: '0808112380707',
        image : 'kamu.jpg',
        createdAt : new Date(),
        updatedAt : new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
