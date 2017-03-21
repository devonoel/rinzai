'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('todos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      message: Sequelize.STRING,
      complete: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('todos');
  }
};
