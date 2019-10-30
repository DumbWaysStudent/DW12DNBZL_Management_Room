'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('rooms', [{
        name: 'A1',
        order_id : 1,
        customer_id : 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name: 'A2',
        order_id : 2,
        customer_id : 2,
        createdAt : new Date(),
        updatedAt : new Date()
      },{
        name: 'A3',
        createdAt : new Date(),
        updatedAt : new Date()
      },{
        name: 'A4',
        createdAt : new Date(),
        updatedAt : new Date()
      },{
        name: 'B1',
        createdAt : new Date(),
        updatedAt : new Date()
      },{
        name: 'B2',
        createdAt : new Date(),
        updatedAt : new Date()
      },{
        name: 'B3',
        createdAt : new Date(),
        updatedAt : new Date()
      }], {});
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
