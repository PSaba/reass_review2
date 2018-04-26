'use strict';
const table = 'tasksToUsers';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(table, {
      taskId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tasks',
          key: 'id'
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      }
    })
    .then(() => queryInterface.addConstraint(table, ['taskId', 'userId'], { type: 'primary key' }));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(table);
  }
};