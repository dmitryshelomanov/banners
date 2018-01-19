const dbConfig = require('./database.json')


const {
  NODE_ENV = 'development',
} = process.env

module.exports = {
  defaultQuality: 80,
  ext: 'png',
  isDelete: false,
  db: dbConfig[NODE_ENV],
}
