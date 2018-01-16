module.exports = (sequelize, DataTypes) => {
  const Rules = sequelize.define('rules', {
    area_id: DataTypes.INTEGER,
    type: DataTypes.STRING,
    inserted: DataTypes.INTEGER,
    content: DataTypes.TEXT,
  }, {
    classMethods: {
      associate: (models) => {
        Rules.belongsTo(models.Area, {
          foreignKey: 'area_id',
        })
      },
    },
  })

  return Rules
}
