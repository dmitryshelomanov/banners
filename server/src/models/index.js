const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config').db


const basename = path.basename(__filename)
const db = {}
let sequelize = null

sequelize = new Sequelize(
  config.database,
  config.username,
  config.password, {
    dialect: config.dialect,
    host: config.host,
  }
)

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file))
    const name = model.name.charAt(0).toUpperCase() + model.name.slice(1)

    db[name] = model
  })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
  db[modelName].Models = db
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
