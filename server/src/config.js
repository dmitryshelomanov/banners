const dbConfig = require('./database.json')


const {
  NODE_ENV = 'development',
} = process.env

module.exports = {
  defaultQuality: 80,
  ext: 'png',
  isDelete: true,
  db: dbConfig[NODE_ENV],
  minifyOpt: {
    collapseInlineTagWhitespace: true,
    collapseWhitespace: true,
  },
}
