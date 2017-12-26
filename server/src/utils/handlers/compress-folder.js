const zipFolder = require('zip-folder')


module.exports = (input, output) => new Promise((res, rej) => {
  zipFolder(input, output, (err) => {
    if (err) return rej(err)
    return res(true)
  })
})
