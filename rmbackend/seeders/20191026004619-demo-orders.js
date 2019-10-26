'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('orders', [{
        customer_id : 2,
        room_id : 3,
        is_done : false,
        is_booked : true,
        duration : 10,
        order_end_time : new Date(),
        createdAt : new Date(),
        updatedAt : new Date()
      },{
        customer_id : 1,
        room_id : 2,
        is_done : false,
        is_booked : true,
        duration : 10,
        order_end_time : new Date(),
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
