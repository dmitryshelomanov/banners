

module.exports = (sequelize, DataTypes) => {
  const Rules = sequelize.define('rules', {
    area_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'trainer',
        key: 'id',
      },
    },
    type: DataTypes.STRING,
    position: DataTypes.STRING,
    bind_element: DataTypes.INTEGER,
    content: DataTypes.TEXT,
  }, {
    timestamps: false,
  })

  Rules.Models = null

  Rules.getCheckSizeRule = async function getCheckSizeRule(areaId) {
    const data = await Rules.findOne({
      where: {
        area_id: areaId,
        type: 'check_size',
      },
    })

    return data
  }

  return Rules
}
