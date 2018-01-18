module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('area', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      html: {
        type: Sequelize.TEXT,
      },
    })
  },
  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('area')
  },
}
