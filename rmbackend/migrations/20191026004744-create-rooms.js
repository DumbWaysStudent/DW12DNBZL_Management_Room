'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('rooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: 'orders',
            key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      customer_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: 'customers',
            key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('rooms');
  }
};