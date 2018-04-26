'use strict';
const table = 'usersToGroups';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(table, {
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
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
    .then(() => queryInterface.addConstraint(table, ['userId', 'groupId'], { type: 'primary key' }));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(table);
  }
};