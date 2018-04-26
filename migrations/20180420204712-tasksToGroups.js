'use strict';
const table = 'tasksToGroups';
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
      groupId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'groups',
          key: 'id'
        }
      }
    })
    .then(() => queryInterface.addConstraint(table, ['taskId', 'groupId'], { type: 'primary key' }));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(table);
  }
};