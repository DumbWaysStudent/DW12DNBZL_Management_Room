'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('admins', [{
        email: 'budi@gmail.com',
        password: '12345',
        name: 'Budi Santoso',
        image: 'pantad.jpg',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        email: 'samsudi@gmail.com',
        password: '12345',
        name: 'Samsudi hadi',
        image: 'pantad.jpg',
        createdAt : new Date(),
        updatedAt : new Date()
      },
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
