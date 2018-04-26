'use strict';
const table = 'tasks';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(table, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      creatorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      assigneeId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      completed: {
        type: Sequelize.BOOLEAN
      },
      dueAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
    .then(() => queryInterface.addIndex(table, ['dueAt', 'createdAt', 'updatedAt'], { indexType: 'BTREE' }))
    .then(() => queryInterface.addIndex(table, ['completed'], { indexType: 'BTREE' }))
    .then(() => queryInterface.addIndex(table, ['creatorId', 'assigneeId'], { indexType: 'BTREE' }))
    // .then(() => queryInterface.addIndex(table, ['description'], { indexType: 'FULLTEXT' }))
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(table);
  }
};