module.exports = (sequelize, DataTypes) => {
  const Area = sequelize.define('area', {
    name: DataTypes.STRING,
    html: DataTypes.TEXT,
  }, {
    tableName: 'area',
    timestamps: false,
  })

  Area.Models = null

  Area.associate = function associate(models) {
    Area.hasMany(models.Rules, {
      foreignKey: 'area_id',
    })
  }

  Area.getAreaInfo = async function getAreaInfo(areaId) {
    const data = await Area.findOne({
      include: [{
        model: this.Models.Rules,
        attributes: {
          exclude: ['id'],
        },
        where: {
          type: {
            [sequelize.Op.ne]: 'chek_size',
          },
        },
      }],
      where: {
        id: areaId,
      },
    })

    return data
  }

  return Area
}
