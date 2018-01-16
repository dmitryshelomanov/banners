module.exports = (sequelize, DataTypes) => {
  const Area = sequelize.define('area', {
    name: DataTypes.STRING,
  }, {
    classMethods: {

    },
  })

  return Area
}
