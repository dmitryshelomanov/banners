const debug = require('debug')('banner:firmware-util')
const { minify } = require('html-minifier')
const fs = require('fs-extra')
const types = require('./types')


function minifyHtml(string) {
  return minify(string, {
    conservativeCollapse: true,
    preserveLineBreaks: true,
    collapseWhitespace: true,
    minifyJS: true,
    removeComments: true,
  })
}

/**
 * Здесь выполнить то что нужно сделать
 * После того как прошили архив и
 * Положили в папку
 * @param {*} lastResolve
 * @param {*} data
 * @param {*} areaPath
 * @param {*} fileName
 */
module.exports = async (lastResolve, data, areaPath, fileName) => {
  const scriptSub = data.rules.find((rule) => rule.type === types.SCRIPT_SUB)

  if (typeof scriptSub !== 'undefined') {
    await fs.remove(`${areaPath}/libs`)
    debug('delete libs folder')
  }

  await fs.writeFile(`${areaPath}/${fileName}`, minifyHtml(lastResolve))
  debug(`end write to file ${areaPath}/${fileName}`)

  await fs.rename(`${areaPath}/${fileName}`, `${areaPath}/index.html`)
  debug(`end rename file ${areaPath}/${fileName} to index.html`)
}
