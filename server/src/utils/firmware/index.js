const cheerio = require('cheerio')
const debug = require('debug')('banner:firmware-util')
const fs = require('fs-extra')
const { minify } = require('html-minifier')
const { Area, Rules, Sequelize } = require('../../models')
const { process, area } = require('../temp-path')()
const types = require('./types')
const computed = require('./computed')
const asyncMap = require('./mapper')


function mapperFn(mapData, nextHtml) {
  return new Promise(async (res, rej) => {
    try {
      res(await mapData(nextHtml))
    }
    catch (error) {
      rej(error)
    }
  })
}

function minifyHtml(string) {
  return minify(string, {
    conservativeCollapse: true,
    preserveLineBreaks: true,
    collapseWhitespace: true,
    minifyJS: true,
    removeComments: true,
  })
}

module.exports = async ({ nameFolder, area: areaName, fileName }) => {
  const rs = []
  const data = await Area.findOne({
    include: [{
      model: Rules,
      attributes: {
        exclude: ['id'],
      },
      where: {
        type: {
          [Sequelize.Op.ne]: 'size',
        },
      },
    }],
    where: {
      name: areaName,
    },
  })

  try {
    const path = process(`${nameFolder}/${fileName}`)
    const $ = cheerio.load(await fs.readFile(path))

    if (data === null) {
      throw new Error('rules not found')
    }
    for (let i = 0; i < data.rules.length; i++) {
      const hooks = computed(data.rules[i])

      if (hooks !== null) {
        debug(`push hook from ${data.rules[i].type}`)
        rs.push(hooks)
      }
    }

    asyncMap(rs, mapperFn, $.html())
      .then(async (lastResolve) => {
        const areaPath = area(nameFolder, areaName)
        const scriptSub = data.rules.find(rule => rule.type === types.SCRIPT_SUB)

        if (typeof scriptSub !== 'undefined') {
          await fs.remove(`${areaPath}/libs`)
          debug('delete libs folder')
        }
        await fs.writeFile(`${areaPath}/${fileName}`, minifyHtml(lastResolve))
        debug(`end write to file ${areaPath}/${fileName}`)
        await fs.rename(`${areaPath}/${fileName}`, `${areaPath}/index.html`)
        debug(`end rename file ${areaPath}/${fileName} to index.html`)
      })
      .catch(error => console.log('error', error))
  }
  catch (error) {
    throw error
  }
}
