'use strict';
module.exports = (sequelize, DataTypes) => {
  const rooms = sequelize.define('rooms', {
    name: DataTypes.STRING,
    order_id : DataTypes.INTEGER,
    customer_id : DataTypes.INTEGER
  }, {});
  rooms.associate = function(models) {
    
    // associations can be defined here
    rooms.belongsTo(models.customers, {
      as : 'customerid',
      foreignKey: 'customer_id',
    }),
    rooms.belongsTo(models.orders, {
      as : 'orderid',
      foreignKey: 'order_id',
    })
  };
  return rooms;
};