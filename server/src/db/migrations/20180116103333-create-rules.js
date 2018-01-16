module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('rules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      area_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'area',
          key: 'id',
        },
      },
      type: {
        type: Sequelize.STRING,
      },
      inserted: {
        type: Sequelize.INTEGER,
      },
      content: {
        type: Sequelize.TEXT,
      },
    })
  },
  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('rules')
  },
}
