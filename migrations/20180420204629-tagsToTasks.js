'use strict';
const table = 'tagsToTasks';
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
      tagId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tags',
          key: 'id'
        }
      }
    })
    .then(() => queryInterface.addConstraint(table, ['taskId', 'tagId'], { type: 'primary key' }));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(table);
  }
};