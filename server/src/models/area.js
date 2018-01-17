module.exports = (sequelize, DataTypes) => {
  const Area = sequelize.define('area', {
    name: DataTypes.STRING,
  }, {
    tableName: 'area',
    timestamps: false,
  })

  Area.associate = function associate(models) {
    Area.hasMany(models.Rules, {
      foreignKey: 'area_id',
    })
  }

  return Area
}
