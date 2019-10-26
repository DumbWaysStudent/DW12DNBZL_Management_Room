'use strict';
module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define('orders', {
    customer_id: DataTypes.INTEGER,
    room_id: DataTypes.INTEGER,
    is_done: DataTypes.BOOLEAN,
    is_booked: DataTypes.BOOLEAN,
    duration: DataTypes.INTEGER,
    order_end_time: DataTypes.DATE
  }, {});
  orders.associate = function(models) {
    // associations can be defined here
  };
  return orders;
};