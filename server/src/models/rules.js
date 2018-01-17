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

  return Rules
}
