const cheerio = require('cheerio')
const fs = require('fs-extra')
const { process } = require('../temp-path')()
const { Area, Rules, Sequelize } = require('../../models')
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

    for (let i = 0; i < data.rules.length; i++) {
      const hooks = computed(data.rules[i])

      if (hooks !== null) {
        rs.push(hooks)
      }
    }

    asyncMap(rs, mapperFn, $.html())
      .then((lastResolve) => {
        console.log(lastResolve)
      })
      .catch((error) => {

      })
  }
  catch (error) {
    throw error
  }
}
