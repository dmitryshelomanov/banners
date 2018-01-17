const cheerio = require('cheerio')
const fs = require('fs-extra')
const { process } = require('../temp-path')()
const { Area, Rules } = require('../../models')
const computed = require('./computed')
const asyncMap = require('./mapper')


function mapperFn(mapData, nextHtml) {
  return new Promise(async (res, rej) => {
    try {
      res(await mapData(nextHtml))
    }
    catch (error) {
      rej()
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
    }],
    where: { name: areaName },
  })

  try {
    const path = process(`${nameFolder}/${fileName}`)
    const $ = cheerio.load(await fs.readFile(path))

    for (let i = 0; i < data.rules.length; i++) {
      const hooks = computed(data.rules[i], $.html())

      if (hooks !== false) {
        rs.push(hooks)
      }
    }

    asyncMap(rs, mapperFn)
      .then((lastResolve) => {
        console.log(lastResolve)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  catch (error) {
    throw error
  }
}
