module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('area', [
    {
      id: 1,
      name: 'mail',
      html: 'area mail html data',
    },
    {
      id: 2,
      name: 'yadex',
      html: 'area yadex html data',
    },
  ], {}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('area', null, {}),
}

